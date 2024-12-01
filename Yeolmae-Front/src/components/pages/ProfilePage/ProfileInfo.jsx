import { useState, useEffect } from 'react';
import createApiRequest, { endpoints } from '../../../api/queryStrReq';

function InfoRow({ label, value }) {
  return (
    <div className="row m-1 justify-items-center">
      <div className="col-2 mx-2">
        <h6>{label}</h6>
      </div>
      <div className="col-4">
        <div>{value}</div>
      </div>
    </div>
  );
}

function ProfileInfo({ memberId, setUserInfo }) {
  const [info, setInfo] = useState({
    email: [],
    userName: [],
    school: [],
    major: [],
    introduction: []
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const params = { memberId };
        const { email, name, school, major, introduction } = await createApiRequest(
          endpoints.INFO,
          params
        );
        setInfo({
          email,
          userName: name,
          school,
          major,
          introduction
        });
        setUserInfo({
          email,
          userName: name,
          school,
          major,
          introduction
        });
        console.log('memberId: ', memberId, info);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getData();
  }, [memberId, setUserInfo]);

  return (
    <div className="col-10 mx-2 my-4 p-2 justify-items-center">
      <InfoRow label="이메일" value={info.email} />
      <InfoRow label="학교" value={info.school} />
      <InfoRow label="학과" value={info.major} />
      <InfoRow label="자기소개" value={info.introduction} />
    </div>
  );
}

export default ProfileInfo;
