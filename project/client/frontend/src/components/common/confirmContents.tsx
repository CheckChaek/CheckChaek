interface Content {
  content: string;
  okAction: () => void;
  cancelAction: () => void;
}

function ConfirmContents({ content, okAction, cancelAction }: Content) {
  return (
    <div className="h-full bg-BACKGROUND-50 rounded shadow-md flex flex-col justify-center items-center">
      <p className="text-sm text-gray-500">{content}</p>
      <div className="flex justify-center mt-3">
        <button
          type="button"
          className="rounded-md px-3 py-2  text-BUTTON-500 mx-2"
          onClick={cancelAction}>
          취소
        </button>

        <button
          type="button"
          className="rounded-md px-3 py-2 hover:bg-BUTTON1-900 bg-BUTTON1-500 text-FONT-50 mx-2"
          onClick={okAction}>
          확인
        </button>
      </div>
    </div>
  );
}

export default ConfirmContents;
