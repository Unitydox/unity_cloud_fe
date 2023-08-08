interface ImageCardProps {
    src: string
}
 
const ImageCard = ({src}: ImageCardProps) => {
    return (
        <div className="h-[200px] w-[200px] rounded-lg">
            <img src={src} alt="img" className="rounded-lg object-cover" />
        </div>
    );
}
 
export default ImageCard;