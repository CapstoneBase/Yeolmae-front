import React, { useMemo, memo, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// QuillEditor is an uncontrolled React component
const QuillEditor = memo(({ quillRef, api, htmlContent, setHtmlContent }) => {
  const imageHandler = useCallback(() => {
    const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*'); // 이미지 파일만 선택가능하도록 제한
    input.setAttribute('name', 'image');
    input.click();

    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = async () => {
      const file = input.files[0];
      formData.append('image', file);

      // 폼데이터를 서버에 넘겨 multer로 이미지 URL 받아오기
      const res = await api.uploadImage(formData);
      if (!res.success) {
        alert('이미지 업로드에 실패하였습니다.');
      }
      const { url } = res.payload;
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection()?.index;

      if (typeof range !== 'number') return;

      quill.setSelection(range, 1);
      /* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다. 
               위치 인덱스와 길이를 넣어주면 된다. */

      quill.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt="image" />`);
    }; // 주어진 인덱스에 HTML로 작성된 내용물을 에디터에 삽입한다.
  }, [api, quillRef]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] }
          ],
          ['image', 'video']
        ],
        handlers: {
          image: imageHandler
        }
      }
    }),
    [imageHandler]
  );
  return (
    <ReactQuill
      ref={quillRef}
      value={htmlContent}
      onChange={setHtmlContent}
      modules={modules}
      theme="snow"
    />
  );
});

export default QuillEditor;
