import { useState, useEffect } from 'react';
import createApiRequest, { endpoints } from '../../../api/queryStrReq';
import PageGrid from '../../Common/PageGrid';
import Paginate from '../../Common/Pagination';
import ProfileInfo from './ProfileInfo';
import AuthButton from '../../Common/AuthButton';

function ProfilePage() {
  const [curPage, setCurPage] = useState(0);
  const handlePageClick = ({ selected }) => {
    setCurPage(selected);
  };
  const [pageData, setPageData] = useState({
    totalElements: 0,
    totalPages: 0
  });

  const profileId = localStorage.getItem('id');
  const [userInfo, setUserInfo] = useState({
    email: [],
    userName: [],
    school: [],
    major: [],
    introduction: []
  });
  console.log(userInfo);

  return (
    <>
      <div className="row mx-5 my-4 px-4">
        <h2>마이프로필</h2>
      </div>
      <section>
        <div className="row mx-5 px-4 justify-content-between">
          <div className="col-6 d-flex justify-content-start align-items-center">
            <h4>{userInfo.userName}님의 정보</h4>
          </div>
          <div className="col-4 d-flex justify-content-end px-5">
            <AuthButton
              text="내 정보 관리하기"
              destination="/editProfilePage"
              curstate={userInfo}
            />
          </div>
        </div>
        <div className="row mx-5 px-4 justify-content-center">
          <ProfileInfo memberId={profileId} setUserInfo={setUserInfo} />
        </div>
      </section>
      <section>
        <div className="row mx-5 px-4">
          <h4>{userInfo.userName}님이 작성한 글</h4>
        </div>
        <PageGrid memberId={profileId} endpoint={endpoints.POSTS} page={curPage} size={16} />
        <div className="row align-items-center">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <Paginate
              setPageData={setPageData}
              pageCount={pageData.totalPages}
              onPageChange={handlePageClick}
              currentPage={curPage}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
