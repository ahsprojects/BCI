import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv('eeg_data.csv')

signal = df.values.flatten()  # Flatten the DataFrame to a 1D array

signal = (signal /4095)*1.1 
signal = signal /2537.5
fs =512
t = np.linspace(0, 10, fs*10, endpoint=False)  # 1 second time vector
# Compute the Fourier Transform
fft_result = np.fft.fft(signal)
fft_freqs = np.fft.fftfreq(len(t), 1/fs)

# Only keep the positive half of the spectrum
half_n = len(t) // 2
fft_magnitude = np.abs(fft_result[:half_n])
fft_freqs = fft_freqs[:half_n]

# Plotting
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(t[:512], signal[:512])
plt.title("Time Domain Signal")
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
