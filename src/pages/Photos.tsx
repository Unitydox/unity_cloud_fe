import { useEffect, useState } from "react";
import ImageCard from "components/ImageCard";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

interface image_data {
    date: string,
    images: string[]
}

const PhotosGallery = () => {

    const [imageData, setImageData] = useState<image_data[]>([
        {
            date: 'Today',
            images: ['https://picsum.photos/id/1', 'https://picsum.photos/id/2', 'https://picsum.photos/id/3']
        }
    ]);

    useEffect(() => {
        axios.get("https://picsum.photos/v2/list?page=1&limit=10").then(res => {
            setImageData([{
                date: 'Today',
                images: res.data.map(i => i.download_url)
            }])
            
        })
    }, [])


    return (
        <section>
            {
                imageData && imageData.map((item, index) => (
                    <div key={index}>
                        <Typography variant="h4" color="blue">
                            {item.date}
                        </Typography>
                        <div className="flex overflow-hidden">
                            <div className="flex w-full max-w-lg gap-4 overflow-x-auto p-4">
                                {
                                    item.images && item.images.map((img, img_index) => (
                                        <ImageCard src={img} key={index+"-"+img_index} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}
 
export default PhotosGallery;