'use client';

import React, { useEffect, useState } from 'react';
import Button from '../ui/button';

interface StopwatchProps {
    currentState: string | null;
}

const Stopwatch: React.FC<StopwatchProps> = ({ currentState }) => {
    const [time, setTime] = useState(1200000);
    const [isRunning, setIsRunning] = useState(false);
    const [showStopConfirmModal, setShowStopConfirmModal] = useState(false);

    const startRequest = async () => {
        const response = await fetch('http://localhost:8000/model-training/start-collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time,state:currentState }),
            credentials: 'include',
        });
        const data = await response.json();
        if (data["status"] == "success") {
            setIsRunning(true);
        }
    }
    const stopRequest = async () => {
        const response = await fetch('http://localhost:8000/model-training/stop-collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time,state:currentState }),
            credentials: 'include',
        });

        const data = await response.json();
        if (data["status"] == "success") {
            setIsRunning(false);
        }
    }

    const timeCompleted = async () => {
        const response = await fetch('http://localhost:8000/model-training/data-collected', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time,state:currentState }),
            credentials: 'include',
        });

        const data = await response.json();
        if (data["status"] == "success") {
            window.location.reload();
        }
    
    }

    useEffect(() => {
        setTime(1200000);
        setIsRunning(false);
        stopRequest();
    }, [currentState]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 10);
            }, 10);
        } else if (!isRunning && timer) {
            clearInterval(timer);
        } else if (time <= 0) {
            // TODO: Send a request to the server to stop recording the data and mark the current state data collection as complete
            stopRequest();
            timeCompleted();
            setTime(1200000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, time]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    };

    

    // const resetRequest = async () => {
    //     const response = await fetch('/api/reset', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ time,state:currentState }),
    //     });

    //     if (response.ok) {
    //         setTime(1200000);
    //     }

    //     console.log("Reset Request Sent");
    //     setTime(1200000);
    // }

    const handleStartPause = () => {
        if (isRunning) {
            stopRequest();
            setShowStopConfirmModal(true);
        } else {
            startRequest();
        }
    };

    const handleConfirmStop = (confirm: boolean) => {
        if (!confirm) {
            startRequest();
        }
        setShowStopConfirmModal(false);
    };

    // const handleReset = () => {
    //     stopRequest();
    //     setShowResetConfirmModal(true);
    // };

    // const handleConfirmReset = async (confirm: boolean) => {
    //     if (confirm) {
    //         await resetRequest();
    //     }else{
    //         startRequest();
    //     }
    //     setShowResetConfirmModal(false);
    // };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col lg:flex-row gap-4">

                <div className="text-5xl bg-white font-mono rounded-2xl p-5">
                    {formatTime(time)}
                </div>
                <Button onClick={handleStartPause} className="!bg-primary">
                    {isRunning ? 'Stop' : 'Start'}
                </Button>
            </div>
            {showStopConfirmModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-[100]">
                    <div className="bg-white rounded-lg w-full max-w-xl">
                      <div className='p-5'>
                        <h1 className='text-lg font-semibold'>Stop the timer</h1>
                        <p className='text-gray-600'>Are you sure you want to stop the timer?</p>
                      </div>
                        <div className="flex justify-end space-x-4 py-4 px-4 border-t">
                            <Button onClick={() => handleConfirmStop(false)} className="!bg-gray-100 !text-gray-700">
                                No
                            </Button>
                            <Button onClick={() => handleConfirmStop(true)}>
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default Stopwatch;
