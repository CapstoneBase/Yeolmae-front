import React from 'react';
import {
  PDFDownloadLink,
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import Button from '../../Common/Button';

Font.register({
  family: 'Pretendard',
  fonts: [
    {
      src: 'https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraLight.woff',
      fontWeight: 200
    },
    {
      src: 'https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff',
      fontWeight: 400
    },
    {
      src: 'https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff',
      fontWeight: 500
    },
    {
      src: 'https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff',
      fontWeight: 600
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Pretendard',
    fontWeight: 400
  },
  section: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Pretendard',
    fontWeight: 600
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 15,
    borderBottom: 1,
    paddingBottom: 5,
    fontFamily: 'Pretendard',
    fontWeight: 400
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10
  },
  label: {
    width: '20%',
    fontSize: 12,
    fontFamily: 'Pretendard',
    fontWeight: 600
  },
  value: {
    width: '80%',
    fontSize: 12,
    fontFamily: 'Pretendard',
    fontWeight: 400
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    fontFamily: 'Pretendard',
    fontWeight: 500
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Pretendard',
    fontWeight: 500
  },
  cardDate: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Pretendard',
    fontWeight: 200
  },
  cardDescription: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Pretendard',
    fontWeight: 400
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8
  },
  skillBadge: {
    backgroundColor: '#6c757d',
    padding: '4 8',
    borderRadius: 4,
    marginRight: 8
  },
  skillText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Pretendard',
    fontWeight: 400
  },
  projectCard: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    gap: 10
  },
  projectContent: {
    flex: 3, // 내용 영역 비율 증가
    marginRight: 10
  },
  imageContainer: {
    flex: 1, // 이미지 영역 비율 감소
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  projectImage: {
    width: 120, // 이미지 너비 축소
    height: 90, // 이미지 높이 축소
    objectFit: 'cover'
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Pretendard',
    fontWeight: 500
  },
  cardDescription: {
    fontSize: 11,
    marginTop: 5,
    fontFamily: 'Pretendard',
    fontWeight: 400
  },
  cardDate: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Pretendard',
    fontWeight: 200
  }
});

function PortfolioPDFDocument({ info, contestPosts, graduationProjectPosts, otherProjectPosts }) {
  const renderSections = () => {
    const sections = [];
    let currentPage = [];
    let currentHeight = 0;
    const maxHeight = 700; // A4 height - margins

    const addSection = (section, height) => {
      if (currentHeight + height > maxHeight) {
        sections.push([...currentPage]);
        currentPage = [section];
        currentHeight = height;
      } else {
        currentPage.push(section);
        currentHeight += height;
      }
    };

    // 기본 정보 섹션
    const infoSection = (
      <View style={styles.section}>
        <Text style={styles.title}>{info.name}의 포트폴리오</Text>
        <View style={styles.row}>
          <Text style={styles.label}>생년월일</Text>
          <Text style={styles.value}>{info.birthDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{info.contact[0].type}</Text>
          <Text style={styles.value}>{info.contact[0].value}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>자기소개</Text>
          <Text style={styles.value}>{info.selfIntroduction}</Text>
        </View>
      </View>
    );
    addSection(infoSection, 150);

    // 경력 섹션
    const experiencesSection = (
      <View style={styles.section}>
        <Text style={styles.subTitle}>경력</Text>
        {info.experiences.map((exp) => (
          <View key={exp.id} style={styles.card}>
            <Text style={styles.cardTitle}>{exp.title}</Text>
            <Text style={styles.cardDate}>
              {exp.startDate} - {exp.endDate}
            </Text>
            <Text style={styles.cardDescription}>{exp.description}</Text>
          </View>
        ))}
      </View>
    );
    addSection(experiencesSection, info.experiences.length * 100);

    // 학력 섹션
    const educationSection = (
      <View style={styles.section}>
        <Text style={styles.subTitle}>학력</Text>
        {info.education.map((edu) => (
          <View key={edu.id} style={styles.card}>
            <Text style={styles.cardTitle}>{edu.title}</Text>
            <Text style={styles.cardDate}>
              {edu.startDate} - {edu.endDate}
            </Text>
            <Text style={styles.cardDescription}>{edu.description}</Text>
          </View>
        ))}
      </View>
    );
    addSection(educationSection, info.education.length * 100);

    // 수상 내역 섹션
    const awardsSection = (
      <View style={styles.section}>
        <Text style={styles.subTitle}>수상 내역</Text>
        {info.awards.map((award) => (
          <View key={award.id} style={styles.card}>
            <Text style={styles.cardTitle}>{award.title}</Text>
            <Text style={styles.cardDate}>
              {award.startDate} - {award.endDate}
            </Text>
            <Text style={styles.cardDescription}>{award.description}</Text>
          </View>
        ))}
      </View>
    );
    addSection(awardsSection, info.awards.length * 100);

    // 자격증 섹션
    const certificationsSection = (
      <View style={styles.section}>
        <Text style={styles.subTitle}>자격증</Text>
        {info.certifications.map((cert, index) => (
          <Text key={index} style={styles.value}>
            {cert}
          </Text>
        ))}
      </View>
    );
    addSection(certificationsSection, info.certifications.length * 30);

    // 스킬 섹션
    const skillsSection = (
      <View style={styles.section}>
        <Text style={styles.subTitle}>스킬</Text>
        <View style={styles.skillsContainer}>
          {info.skill.map((index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{index}</Text>
            </View>
          ))}
        </View>
      </View>
    );
    addSection(skillsSection, 100);

    // 타입별 프로젝트 섹션
    const projectSection = (posts, title) =>
      posts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subTitle}>{title}</Text>
          {posts.map((post) => (
            <View key={post.postId} style={styles.projectCard}>
              <View style={styles.projectContent}>
                <Text style={styles.cardTitle}>{post.title}</Text>
                <Text style={styles.cardDate}>
                  {post.startDate} - {post.endDate}
                </Text>
                <Text style={styles.cardDescription}>{post.description}</Text>
              </View>
              <View style={styles.imageContainer}>
                {post.thumbnail && <Image src={post.thumbnail} style={styles.projectImage} />}
              </View>
            </View>
          ))}
        </View>
      );

    // 프로젝트 섹션 렌더링 후 addSection 호출
    const projectSections = [
      {
        content: projectSection(graduationProjectPosts, '졸업작품'),
        height: graduationProjectPosts.length * 120
      },
      {
        content: projectSection(otherProjectPosts, '개인 프로젝트'),
        height: otherProjectPosts.length * 120
      },
      {
        content: projectSection(contestPosts, '대회 및 공모전'),
        height: contestPosts.length * 120
      }
    ];

    projectSections.forEach((section) => {
      if (section.content) {
        addSection(section.content, section.height);
      }
    });

    if (currentPage.length > 0) {
      sections.push(currentPage);
    }

    return sections;
  };

  const pages = renderSections();

  return (
    <Document>
      {pages.map((pageContent, index) => (
        <Page key={index} size="A4" style={styles.page}>
          {pageContent}
        </Page>
      ))}
    </Document>
  );
}

function PortfolioPDFButton({ info, contestPosts, graduationProjectPosts, otherProjectPosts }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
    >
      <PDFDownloadLink
        document={
          <PortfolioPDFDocument
            info={info}
            contestPosts={contestPosts}
            graduationProjectPosts={graduationProjectPosts}
            otherProjectPosts={otherProjectPosts}
          />
        }
        fileName={`${info.name}님의 열매 포트폴리오.pdf`}
        className="btn btn-primary"
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        {({ loading }) => (loading ? 'PDF 생성중...' : '포트폴리오 다운로드')}
      </PDFDownloadLink>
    </div>
  );
}

export default PortfolioPDFButton;
