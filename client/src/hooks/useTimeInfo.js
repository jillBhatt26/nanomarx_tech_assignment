import { useEffect, useState } from 'react';

const useTimeInfo = date => {
    const [timeInfo, setTimeInfo] = useState('24 hours ago');

    // effects
    useEffect(() => {
        const storyDate = new Date(date);

        const differenceMS = Date.now() - storyDate;
        const differenceHours = differenceMS / (1000 * 60 * 60); // 1 hour in ms

        // show now upto 10 mins
        if (differenceMS < 1000 * 60 * 10) {
            return setTimeInfo('just now');
        }

        // 1 hour
        if (
            differenceHours > 1000 * 60 * 60 * 1 &&
            differenceHours < 1000 * 60 * 60 * 2
        ) {
            return setTimeInfo('1 hour ago');
        }

        // show hours info till 48 hours
        if (differenceHours < 1000 * 60 * 60 * 48) {
            return setTimeInfo(`${Math.floor(differenceHours)} hours ago`);
        }

        // show days info beyond 48 hours
        const differenceDays = differenceMS / (1000 * 60 * 60 * 24); // 1 day in ms
        return setTimeInfo(`${Math.floor(differenceDays)} days ago`);
    }, [date]);

    return timeInfo;
};

export default useTimeInfo;
