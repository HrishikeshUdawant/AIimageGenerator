import { downloadImage } from "../utils";
import { download } from "../assets";

const Card = ({ _id, name, prompt, photo }) => (
  <div className="rounded-xl shadow">
    <img src={photo} alt={prompt} className="rounded-xl" />
    <div className="p-3">
      <p className="text-sm">{prompt}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold">{name}</span>
        <button onClick={() => downloadImage(_id, photo)}>
          <img src={download} className="w-5" />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
