import React, { useMemo, memo, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImage } from '../../../api/uploadImage';

const QuillEditor = memo(({ quillRef, htmlContent, setHtmlContent }) => {
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      try {
        const file = input.files[0];
        if (!file) return;

        // 이미지 크기 및 타입 체크 (선택사항)
        if (file.size > 5 * 1024 * 1024) {
          // 5MB 제한
          alert('파일 크기는 5MB 이하여야 합니다.');
          return;
        }

        const formData = new FormData();
        formData.append('multipartFile', file);

        // 업로드 시작을 사용자에게 알림
        console.log('이미지 업로드 중...');

        const response = await uploadImage(formData);

        // 응답에서 S3 URL 추출
        if (!response || !response[0]?.fileUrl) {
          throw new Error('이미지 URL을 받지 못했습니다.');
        }

        const s3Url = response[0].fileUrl; // S3 URL 사용

        // 에디터에 이미지 삽입
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection()?.index || 0;

        quill.insertEmbed(range, 'image', s3Url);
        quill.setSelection(range + 1);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
    };
  }, [quillRef]);

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
      placeholder="내용을 입력하세요..."
    />
  );
});

export default QuillEditor;
