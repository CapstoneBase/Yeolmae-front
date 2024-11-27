{/*포트폴리오 수정 페이지 만들기
    이름, 연락처, 경력, 학력, 수상내역, 자격증, 스킬에 대한 수정사항을 제출하는 버튼을 만들고,
    제출하기 버튼을 누르면
    PUT메소드로 엔드포인트는 /api/v1/portfolio를 사용.
    (값이 null이 아닌 항목들만 수정, 리스트 항목은 null이 아니면 해당 리스트 항목으로 덮어쓰기)
    
    GET /api/v1/portfolio/graduation-project-posts에서
    포트폴리오에 추가한 내 졸업작품 게시물 전체 조회하고,
    (+) 버튼을 누르면 modal창(팝업창)이 생겨서
    GET /api/v1/portfolio/my-graduation-project-posts로
    내 졸업작품 게시물 전체 조회, 추가하고 싶은 졸업작품 게시글을 골라
    POST /api/v1/portfolio/graduation-project-posts/{postId}
    내 졸업작품 게시물 내 포트폴리오에 추가하면
    "포트폴리오에 추가한 내 졸업작품 게시글" 그룹에 카드가 하나 추가되도록.
    
    GET /api/v1/portfolio/contest-posts에서
    포트폴리오에 추가한 내 공모전 게시물 전체 조회하고,
    (+) 버튼을 누르면 modal창(팝업창)이 생겨서
    GET /api/v1/portfolio/my-contest-posts로
    내 공모전 게시물 전체 조회, 추가하고 싶은 공모전 게시글을 골라
    POST /api/v1/portfolio/contest-posts/{postId}
    내 공모전 게시물 내 포트폴리오에 추가하면
    "포트폴리오에 추가한 내 공모전 게시글" 그룹에 카드가 하나 추가되도록.
    
    GET /api/v1/portfolio/other-project-posts에서
    포트폴리오에 추가한 내 기타 프로젝트 게시물 전체 조회하고,
    (+) 버튼을 누르면 modal창(팝업창)이 생겨서
    GET /api/v1/portfolio/my-other-project-posts로
    내 기타 프로젝트 게시물 전체 조회, 추가하고 싶은 기타 프로젝트 게시글을 골라
    POST /api/v1/portfolio/other-project-posts/{postId}
    내 기타 프로젝트 게시물 내 포트폴리오에 추가하면
    "포트폴리오에 추가한 내 기타 프로젝트 게시글" 그룹에 카드가 하나 추가되도록.
    
    PortfolioEditPage.jsx와 ProjectModal.jsx 필요할 것으로 보임 */}