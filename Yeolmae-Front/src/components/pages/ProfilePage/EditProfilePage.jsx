import AuthButton from '../../Common/AuthButton';
import ProfileInfo from './ProfileInfo';

function EditProfilePage({ profileId, curstate }) {
  const userId = localStorage.getItem('id');

  return (
    <>
      <div className="row mx-5 my-4 px-4">
        <h2>내 정보 관리</h2>
      </div>
      <div className="row mx-5 px-4">
        <h4>내 정보 수정</h4>
      </div>
      <ProfileInfo memberId={userId} setUserInfo={curstate} />
      <div className="row mx-5 px-4">
        <h4>비밀번호 수정</h4>
      </div>
      <div>비밀번호 변경 폼</div>
      <AuthButton text="수정하기" />
      <AuthButton text="회원 탈퇴" />
    </>
  );
}

export default EditProfilePage;
