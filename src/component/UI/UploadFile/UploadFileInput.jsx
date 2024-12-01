import { useRef } from "react";

const UploadFileInput = () => {
    const ref = useRef();
    const handleClick = () => {
        ref.current.click()
    }
    return (
        <div >
            <label className="FileInputLabel">
            الملف
            </label>
            <div className="FileInput">
                <div onClick={handleClick} className="placeHolder">قم برفع ملف المنتج</div>
                <input ref={ref} type="file" />
                <div onClick={handleClick} className="FileInput__Icon">
                رفع
                </div>
            </div>
        </div>
      );
}
 
export default UploadFileInput;