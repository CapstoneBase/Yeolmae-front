import React, { useMemo, memo, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImage } from '../../api/uploadImage';

const QuillEditor = memo(({ quillRef, htmlContent, setHtmlContent, queryParams, endpoint }) => {
  // QuillEditor.js 수정
  // QuillEditor.js
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      try {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('multipartFile', file);

        const response = await uploadImage(formData, endpoint);

        // response 구조 로깅
        console.log('이미지 업로드 응답:', response);

        // response 구조에 따라 URL 추출 로직 수정
        const imageUrl = response.fileUrl || response[0]?.fileUrl;

        if (!imageUrl) {
          throw new Error('이미지 URL을 받지 못했습니다.');
        }

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection()?.index || 0;

        quill.insertEmbed(range, 'image', imageUrl);
        quill.setSelection(range + 1);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert(error.message || '이미지 업로드에 실패했습니다.');
      }
    };
  }, [quillRef, endpoint]);

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
          ['image']
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
      placeholder="내용을 입력하세요..."
    />
  );
});

export default QuillEditor;
