import { useEffect, useState } from "react";
import { Comment } from "../../../types/common";
import { Button, Input, Image, Popup } from "../..";
import icon from "../../_atoms/Shape.png";
import tag from "../../_atoms/Shape(1).png";

const CommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      text: `@ramsesmiron I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.`,
      author: "juliusomo",
      timestamp: new Date().toLocaleString(),
      replies: [],
      count: 2,
      isEditing: false,
      editedText: "",
    },
  ]);
  const [show, setShow] = useState(false);

  const handlePopupModal = () => setShow(true);

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: prevComments.length + 1,
          text: newComment,
          author: "Giorgi",
          timestamp: new Date().toLocaleString(),
          replies: [],
          count: 0,
          isEditing: false,
          editedText: "",
        },
      ]);
      setNewComment("");
    }
  };

  const incrementCount = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, count: comment.count + 1 } : comment
      )
    );
  };

  const decrementCount = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, count: Math.max(comment.count - 1, 0) }
          : comment
      )
    );
  };

  const toggleEdit = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, isEditing: !comment.isEditing }
          : comment
      )
    );
  };

  const handleEditChange = (id: number, value: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, editedText: value } : comment
      )
    );
  };

  const handleSaveEdit = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, text: comment.editedText, isEditing: false }
          : comment
      )
    );
  };

  const handleCancelEdit = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, isEditing: false, editedText: comment.text }
          : comment
      )
    );
  };

  const deleteComment = (id: number) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const saveComment = localStorage.getItem("comments");
    if (saveComment) {
      setComments(JSON.parse(saveComment));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <div className="flex flex-col items-center gap-[20px] w-[375px] m-auto bg-slate-100 p-[20px] xl:w-[100%] xl:h-[100vh] xl:gap-[50px]">
      <div>
        {comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className="w-[343px] p-[15px] relative bg-white xl:flex xl:items-center xl:gap-[20px] xl:w-[730px] xl:h-[167px] xl:relative"
            >
              <div className="flex justify-center items-center gap-[15px] w-[100px] h-[40px] bg-slate-100 rounded-lg absolute bottom-[10px] xl:static xl:w-[40px] xl:h-[100px] xl:flex-col">
                <Button
                  onClick={() => incrementCount(comment.id)}
                  content={"+"}
                  className={"text-indigo-200 font-bold text-base"}
                />
                <p className="text-indigo-600">{comment.count}</p>
                <Button
                  onClick={() => decrementCount(comment.id)}
                  content={"-"}
                  className={"text-indigo-200 font-bold text-base"}
                />
              </div>
              <div className="my-[15px] flex flex-col gap-[15px]">
                <div className="flex gap-[15px]">
                  <Image className={"w-8"} />
                  <p className="font-bold">{comment.author}</p>
                  <p className="">{comment.timestamp}</p>
                </div>
                <p className="w-[311px] h-[120px] text-gray-400 xl:w-[618px] xl:h-[72px]">
                  {comment.text}
                </p>
              </div>
              <div className="flex gap-[10px] justify-end pt-[20px] xl:absolute xl:top-0 xl:right-[50px] xl:gap-[30px]">
                <div className="flex gap-[5px] items-center">
                  {show ? (
                    <Popup
                      title={"Delete comment"}
                      content={
                        "Are you sure you want to delete this comment? This will remove the comment and can’t be undone."
                      }
                      cancelButton={() => setShow(false)}
                      deleteButton={() => deleteComment(comment.id)}
                      cancelContent={"NO, CANCEL"}
                      deleteContent={"YES, DELETE"}
                    />
                  ) : (
                    <div className="flex gap-[5px] items-center">
                      <img className="w-[11.67px] h-[14px]" src={tag} alt="" />
                      <Button
                        onClick={handlePopupModal}
                        content={"Delete"}
                        className={"text-rose-600 hover:text-[#FFB8BB] "}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {comment.isEditing ? (
                    <div className="flex flex-col gap-[10px]">
                      <Input
                        type={"text"}
                        placeholder={""}
                        onChange={(e) =>
                          handleEditChange(comment.id, e.target.value)
                        }
                        value={comment.editedText}
                        className={
                          "w-[311px] h-[96px] p-[15px] border stroke-slate-600 rounded-lg xl:w-[596px]"
                        }
                      />
                      <div className="flex gap-[15px]">
                        <Button
                          onClick={() => handleSaveEdit(comment.id)}
                          content={"UPDATE"}
                          className={
                            "w-[138px] h-[48px] rounded-lg text-white bg-indigo-600"
                          }
                        />
                        <Button
                          onClick={() => handleCancelEdit(comment.id)}
                          content={"CANCEL"}
                          className={
                            "w-[138px] h-[48px] rounded-lg text-white bg-gray-600"
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-[5px] items-center">
                      <img className="w-[14px] h-[13.95px]" src={icon} alt="" />
                      <Button
                        onClick={() => toggleEdit(comment.id)}
                        content={"Edit"}
                        className={"text-indigo-600 hover:text-[#C5C6EF]"}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[343px] h-[189px] p-[15px] bg-white flex relative xl:w-[730px] xl:h-[144px] xl:gap-[20px]">
        <Image
          className={
            "w-[32px] absolute top-[130px] xl:static xl:w-[40px] xl:h-[40px]"
          }
        />
        <Input
          type={"text"}
          placeholder={"Enter your Comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={
            "w-[311px] h-[96px] p-[15px] border stroke-slate-600 rounded-lg xl:w-[596px]"
          }
        />
        <Button
          onClick={addComment}
          content={"SEND"}
          className={
            "bg-indigo-700 w-[104px] h-[48px] text-white rounded-xl absolute top-[120px] right-[15px] xl:static hover:bg-[#C5C6EF]"
          }
        />
      </div>
    </div>
  );
};

export default CommentSection;
