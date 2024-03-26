import { Button } from "../..";
import { PopupType } from "../../../types";

const Popup = ({
  title,
  content,
  cancelButton,
  deleteButton,
  cancelContent,
  deleteContent,
}: PopupType) => {
  return (
    <div className="w-[343px] h-[224px] p-[20px] flex flex-col gap[10px] bg-white rounded-lg xl:w-[400px] xl:h-[252px] xl:p-[40px]">
      <div className="text-lg">
        <h1>{title}</h1>
      </div>
      <div className="text-gray-500">
        <p>{content}</p>
      </div>
      <div className="flex gap[15px]">
        <Button
          onClick={cancelButton}
          content={cancelContent}
          className={"w-[138px] h-[48px] rounded-lg text-white bg-gray-600 xl:w-[161px]"}
        />
        <Button
          onClick={deleteButton}
          content={deleteContent}
          className={"w-[138px] h-[48px] rounded-lg text-white bg-rose-600 xl:w-[161px]"}
        />
      </div>
    </div>
  );
};

export default Popup;
