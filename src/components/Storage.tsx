import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { CloudIcon } from '@heroicons/react/24/outline';

interface StorageProps {
    total: number;
    used: number;
    totalFormatted: string;
    usedFormatted: string;
}
 
const Storage: React.FC<StorageProps> = ({ total, totalFormatted, used, usedFormatted }) => {

    const [storage, setStorage] = useState<StorageProps>({ total, totalFormatted, used, usedFormatted });
    const [usedPercentage, setUsedPercentage] = useState<number>((used/total) * 100);

    useEffect(() => {
        setStorage({ total, totalFormatted, used, usedFormatted });
        setUsedPercentage( ((used/total) * 100) || 0);
    }, [total, totalFormatted, used, usedFormatted]);

    return ( 
        <Card>
            <CardBody>
                <div className='flex flex-row items-center gap-2'>
                    <CloudIcon className='h-6 w-6 stroke-2 text-primary' />
                    <Typography>Storage</Typography>
                </div>
                <Progress size='sm' color={(usedPercentage > 85) ? 'red' : undefined} className='mt-4' value={usedPercentage} />
                <div className='mt-4'>
                    {`
                        ${storage.usedFormatted} of ${storage.totalFormatted} used
                    `}
                </div>
            </CardBody>
        </Card>
    );
}
 
export default Storage;