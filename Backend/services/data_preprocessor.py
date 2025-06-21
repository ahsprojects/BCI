from scipy import signal
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

class PreprocessEEG:
    def __init__(self, sampling_rate=512, notch_freq=50, lowcut=0.5, highcut=30, kalman_process_var=1e-3, kalman_measurement_var=1e-1):
        self.sampling_rate = sampling_rate
        self.notch_freq = notch_freq
        self.lowcut = lowcut
        self.highcut = highcut
        self.kalman_process_var = kalman_process_var  # Process noise covariance (Q)
        self.kalman_measurement_var = kalman_measurement_var  # Measurement noise covariance (R)
        self.notch_b, self.notch_a = None, None
        self.band_pass_b, self.band_pass_a = None, None
        self.initialize_filter()
    
    def clean_data(self, data):
        """ Replaces zeros and outliers with interpolated values """
        data = np.array(data, dtype=np.float64)
        
        # Identify invalid values
        invalid_mask = (data == 0) | (data > 4096) | np.isnan(data)
        
        # Replace invalid values with NaN
        data[invalid_mask] = np.nan
        
        # Interpolation
        valid_indices = np.where(~np.isnan(data))[0]
        invalid_indices = np.where(np.isnan(data))[0]
        
        if len(valid_indices) > 0 and len(invalid_indices) > 0:
            data[invalid_indices] = np.interp(invalid_indices, valid_indices, data[valid_indices])
        
        return data

    def initialize_filter(self):
        """ Initialize notch and bandpass filters """
        nyquist = 0.5 * self.sampling_rate

        # Notch Filter
        self.notch_b, self.notch_a = signal.iirnotch(self.notch_freq, Q=30, fs=self.sampling_rate)

        # Bandpass Filter
        lowcut_norm = self.lowcut / nyquist
        highcut_norm = self.highcut / nyquist
        self.band_pass_b, self.band_pass_a = signal.butter(4, [lowcut_norm, highcut_norm], btype='band')

    def apply_filter(self, data):
        """ Apply notch and bandpass filtering """
        data = signal.filtfilt(self.notch_b, self.notch_a, data)  # Notch filter
        data = signal.filtfilt(self.band_pass_b, self.band_pass_a, data)  # Bandpass filter
        return data

    def preprocess(self, data):
        """ Full preprocessing pipeline: cleaning + filtering + Kalman filtering """
        data = self.clean_data(data)
        filtered_data = self.apply_filter(data)
        return filtered_data
    


def calculate_psd_features(data):
    freqs, psd = signal.welch(data, fs = 512, nperseg = len(data))
    
    energy_alpha = np.sum(psd[(freqs >= 8) & (freqs <= 12)])
    energy_beta = np.sum(psd[(freqs >= 14) & (freqs <= 30)])
    energy_theta = np.sum(psd[(freqs >= 4) & (freqs <= 7)])
    energy_delta = np.sum(psd[(freqs >= 0.5) & (freqs <= 3)])
    
    alpha_beta_ratio = energy_alpha / energy_beta if energy_beta != 0 else 0
    
    features = {
        'energy_alpha': float(energy_alpha),
        'energy_beta': float(energy_beta),
        'energy_theta': float(energy_theta),
        'energy_delta': float(energy_delta),
        'alpha_beta_ratio': float(alpha_beta_ratio)
    }
    
    return features

def plot_signal(df):
    data = df.values.flatten()  # Flatten the DataFrame to a 1D array
    data = ( data/ 4095) * 1.1
    data = data / 2537.5
    preprocessor = PreprocessEEG()
    data = preprocessor.preprocess(data)
    # total_features = []
    # for i in range(0,len(data),512):
    #     features = calculate_psd_features(data[i:i+512])
    #     total_features.append(features)
    # print("Total features: ", len(total_features))
    # # line graph of alpha
    # alpha = [features['energy_alpha'] for features in total_features]
    # plt.plot(alpha)
    # plt.title("Alpha Band Energy")
    # plt.xlabel("Segment")
    # plt.ylabel("Energy")
    #plt.show()   
    # Uncomment the following lines to plot the time and frequency domain signal

  
    fs =512
    t = np.linspace(0, 10, fs*10, endpoint=False)  # 1 second time vector
    # Compute the Fourier Transform
    fft_result = np.fft.fft(data)
    fft_freqs = np.fft.fftfreq(len(t), 1/fs)

    # Only keep the positive half of the spectrum
    half_n = len(t) // 2
    fft_magnitude = np.abs(fft_result[:half_n])
    fft_freqs = fft_freqs[:half_n]

    # Plotting
    plt.figure(figsize=(12, 5))

    plt.subplot(1, 2, 1)
    plt.plot(t[:512], data[:512])
    plt.title("Time Domain data")
    plt.xlabel("Time [s]")
    plt.ylabel("Amplitude")

    plt.subplot(1, 2, 2)
    plt.plot(fft_freqs, fft_magnitude)
    plt.xlim(0, 60)  # Limit x-axis to Nyquist frequency
    plt.title("Frequency Domain (FFT)")
    plt.xlabel("Frequency [Hz]")
    plt.ylabel("Magnitude")
    plt.grid(True)

    plt.tight_layout()
    plt.show()


if __name__ == '__main__':
    df = pd.read_csv('./eeg_data_focused.csv')
    df1= pd.read_csv('./eeg_data_relaxed.csv')
    plot_signal(df)
    plot_signal(df1)
   