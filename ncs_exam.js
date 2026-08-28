// ==================== 설정 ====================
const CONFIG = {
    TOTAL_PROBLEMS: 30,      // 전체 문제 수
    TIME_LIMIT_SEC: 3600,    // 시험 시간 (60분)
    TIME_ALERT_SEC: 60,      // 시간 초과 알림 (60초)
    WARNING_THRESHOLD: 600,  // 경고 시간 (10분 이하)
    DANGER_THRESHOLD: 300,   // 위험 시간 (5분 이하)
    
    // 에빙하우스 곡선 복습 스케줄 (일 기준)
    SPACED_REPETITION: [0, 1, 3, 7]  // 즉시, 1일 후, 3일 후, 7일 후
};

// ==================== 오답 원인 분류 ====================
const ERROR_TYPES = {
    0: { icon: '✅', name: '정답', color: '#28a745' },
    1: { icon: '🔴', name: '개념 부족', color: '#dc3545' },
    2: { icon: '🟡', name: '계산 실수', color: '#ff9800' },
    3: { icon: '🟠', name: '해석 오류', color: '#f39c12' },
    4: { icon: '⚪', name: '시간 부족', color: '#6c757d' }
};

// ==================== 문제 데이터 ====================
// 샘플 문제 (82개: 수리 30개, 언어 30개, 추가 22개)
const problems = [
    // 수리 1-15
    { id: 1, cat: '수리', type: '비율', text: '원가 5,000원, 정가 8,000원. 정가 대비 원가의 비율은?', opts: ['60%', '62.5%', '65%', '67.5%', '70%'], ans: 1, exp: '5,000÷8,000×100=62.5%', errorType: 0, relatedProblems: [5, 31, 32] },
    { id: 2, cat: '수리', type: '할인', text: '원가 20,000원을 30% 할인하면?', opts: ['12,000', '13,000', '14,000', '15,000', '16,000'], ans: 2, exp: '20,000×(1-0.3)=14,000원', errorType: 0, relatedProblems: [4, 8, 33, 34] },
    { id: 3, cat: '수리', type: '평균', text: '70, 80, 90, 85, 75의 평균은?', opts: ['78', '80', '82', '84', '86'], ans: 1, exp: '합=400÷5=80', errorType: 0, relatedProblems: [6, 11, 35, 36] },
    { id: 4, cat: '수리', type: '이윤율', text: '원가 10,000원, 판매가 12,000원. 이윤율은?', opts: ['15%', '18%', '20%', '22%', '25%'], ans: 2, exp: '(12,000-10,000)÷10,000×100=20%', errorType: 0, relatedProblems: [2, 12, 37, 38] },
    { id: 5, cat: '수리', type: '비율', text: '전체 100명, A 45%, B 30%. C는?', opts: ['15명', '20명', '25명', '30명', '35명'], ans: 2, exp: '100×(1-0.45-0.3)=25명', errorType: 0, relatedProblems: [1, 31, 32] },
    { id: 6, cat: '수리', type: '가중평균', text: '5,000원(2개), 6,000원(3개), 7,000원(5개). 평균가?', opts: ['6,000', '6,100', '6,200', '6,300', '6,400'], ans: 3, exp: '(10,000+18,000+35,000)÷10=6,300원', errorType: 0, relatedProblems: [3, 13, 39, 40] },
    { id: 7, cat: '수리', type: '비례', text: 'A:B=3:2, B:C=4:5. A:B:C는?', opts: ['3:2:2.5', '6:4:5', '12:8:10', '6:4:10', '12:8:5'], ans: 2, exp: 'B 맞춰서 A:B=6:4, B:C=4:5이므로 6:4:5', errorType: 0, relatedProblems: [1, 5, 41, 42] },
    { id: 8, cat: '수리', type: '세금', text: '100,000원에 10% 세금. 최종가?', opts: ['105,000', '110,000', '115,000', '120,000', '125,000'], ans: 1, exp: '100,000×1.1=110,000원', errorType: 0, relatedProblems: [2, 4, 43, 44] },
    { id: 9, cat: '수리', type: '연비', text: '2,000km에 50L 사용. 연비는?', opts: ['35', '38', '40', '42', '45'], ans: 2, exp: '2,000÷50=40 km/L', errorType: 0, relatedProblems: [11, 45, 46] },
    { id: 10, cat: '수리', type: '조합', text: '15명 중 3명 선택. 경우의 수?', opts: ['300', '350', '400', '450', '500'], ans: 3, exp: 'C(15,3)=455≈450', errorType: 0, relatedProblems: [14, 15, 47, 48] },
    { id: 11, cat: '수리', type: '시간', text: '시속 80km로 240km 주행. 소요시간?', opts: ['2시간', '2.5시간', '3시간', '3.5시간', '4시간'], ans: 2, exp: '240÷80=3시간', errorType: 0, relatedProblems: [3, 9, 49, 50] },
    { id: 12, cat: '수리', type: '수익률', text: '100만원 투자 후 120만원. 수익률?', opts: ['15%', '18%', '20%', '22%', '25%'], ans: 2, exp: '(120-100)÷100×100=20%', errorType: 0, relatedProblems: [2, 4, 51, 52] },
    { id: 13, cat: '수리', type: '농도', text: '5% 200ml + 10% 300ml. 농도?', opts: ['6%', '7%', '7.5%', '8%', '8.5%'], ans: 3, exp: '(10+30)÷500=8%', errorType: 0, relatedProblems: [3, 6, 53, 54] },
    { id: 14, cat: '수리', type: '면적', text: '가로 20m, 세로 15m. 넓이?', opts: ['250', '280', '300', '320', '350'], ans: 2, exp: '20×15=300m²', errorType: 0, relatedProblems: [10, 15, 55, 56] },
    { id: 15, cat: '수리', type: '단위', text: '1시간 30분은 몇 분?', opts: ['80', '85', '90', '95', '100'], ans: 2, exp: '60+30=90분', errorType: 0, relatedProblems: [10, 14, 57, 58] },
    
    // 수리 추가 31-58
    { id: 31, cat: '수리', type: '비율', text: '전체 학생 200명, 수학 80명. 수학 비율?', opts: ['35%', '38%', '40%', '42%', '45%'], ans: 2, exp: '80÷200×100=40%', errorType: 0, relatedProblems: [1, 5, 32] },
    { id: 32, cat: '수리', type: '비율', text: '판매량 500개, 반품 75개. 반품률?', opts: ['12%', '14%', '15%', '16%', '18%'], ans: 2, exp: '75÷500×100=15%', errorType: 0, relatedProblems: [1, 5, 31] },
    { id: 33, cat: '수리', type: '할인', text: '정가 50,000원을 20% 할인?', opts: ['35,000', '38,000', '40,000', '42,000', '45,000'], ans: 2, exp: '50,000×(1-0.2)=40,000원', errorType: 0, relatedProblems: [2, 4, 34] },
    { id: 34, cat: '수리', type: '할인', text: '원가 30,000원을 15% 할인?', opts: ['23,500', '24,000', '24,500', '25,000', '25,500'], ans: 2, exp: '30,000×(1-0.15)=25,500원', errorType: 0, relatedProblems: [2, 4, 33] },
    { id: 35, cat: '수리', type: '평균', text: '시험 성적 85, 92, 78, 88, 82의 평균?', opts: ['83', '84', '85', '86', '87'], ans: 2, exp: '합=425÷5=85', errorType: 0, relatedProblems: [3, 6, 36] },
    { id: 36, cat: '수리', type: '평균', text: '월별 매출 1,200만, 1,400만, 1,300만의 평균?', opts: ['1,230', '1,260', '1,290', '1,300', '1,330'], ans: 3, exp: '합=3,900÷3=1,300만', errorType: 0, relatedProblems: [3, 6, 35] },
    { id: 37, cat: '수리', type: '이윤율', text: '원가 8,000원, 판매가 9,600원. 이윤율?', opts: ['18%', '20%', '22%', '24%', '26%'], ans: 1, exp: '(9,600-8,000)÷8,000×100=20%', errorType: 0, relatedProblems: [4, 12, 38] },
    { id: 38, cat: '수리', type: '이윤율', text: '원가 15,000원, 판매가 18,000원. 이윤율?', opts: ['18%', '20%', '22%', '24%', '26%'], ans: 1, exp: '(18,000-15,000)÷15,000×100=20%', errorType: 0, relatedProblems: [4, 12, 37] },
    { id: 39, cat: '수리', type: '가중평균', text: '3점짜리 상품 2개, 4점 3개, 5점 5개. 평균?', opts: ['4.2', '4.3', '4.4', '4.5', '4.6'], ans: 2, exp: '(6+12+25)÷10=4.3점', errorType: 0, relatedProblems: [3, 6, 40] },
    { id: 40, cat: '수리', type: '가중평균', text: '2학점 3.5, 3학점 4.0, 4학점 3.0. 평균?', opts: ['3.43', '3.50', '3.57', '3.64', '3.71'], ans: 2, exp: '(7+12+12)÷9=3.56≈3.57', errorType: 0, relatedProblems: [3, 6, 39] },
    { id: 41, cat: '수리', type: '비례', text: 'A:B=2:3, B:C=6:5. A:B:C?', opts: ['2:3:2.5', '4:6:5', '2:6:5', '4:6:5', '6:9:7.5'], ans: 3, exp: 'B 맞춰서 A:B=4:6, B:C=6:5이므로 4:6:5', errorType: 0, relatedProblems: [1, 7, 42] },
    { id: 42, cat: '수리', type: '비례', text: 'X:Y=4:3, Y:Z=3:2. X:Y:Z?', opts: ['4:3:2', '8:6:4', '4:3:2', '8:6:2', '4:6:2'], ans: 1, exp: 'Y 맞춰서 X:Y=4:3, Y:Z=3:2이므로 4:3:2', errorType: 0, relatedProblems: [1, 7, 41] },
    { id: 43, cat: '수리', type: '세금', text: '50,000원에 15% 세금. 최종?', opts: ['55,000', '57,000', '57,500', '60,000', '62,500'], ans: 2, exp: '50,000×1.15=57,500원', errorType: 0, relatedProblems: [2, 8, 44] },
    { id: 44, cat: '수리', type: '세금', text: '80,000원에 8% 세금. 최종?', opts: ['84,000', '85,200', '86,400', '87,600', '88,800'], ans: 1, exp: '80,000×1.08=86,400원', errorType: 0, relatedProblems: [2, 8, 43] },
    { id: 45, cat: '수리', type: '연비', text: '3,000km에 75L 사용. 연비?', opts: ['35', '38', '40', '42', '45'], ans: 2, exp: '3,000÷75=40 km/L', errorType: 0, relatedProblems: [9, 11, 46] },
    { id: 46, cat: '수리', type: '연비', text: '1,500km에 50L 사용. 연비?', opts: ['25', '28', '30', '32', '35'], ans: 2, exp: '1,500÷50=30 km/L', errorType: 0, relatedProblems: [9, 11, 45] },
    { id: 47, cat: '수리', type: '조합', text: '20명 중 2명 선택?', opts: ['180', '190', '200', '210', '220'], ans: 1, exp: 'C(20,2)=20×19÷2=190', errorType: 0, relatedProblems: [10, 14, 48] },
    { id: 48, cat: '수리', type: '조합', text: '10명 중 4명 선택?', opts: ['205', '210', '215', '220', '225'], ans: 1, exp: 'C(10,4)=10×9×8×7÷(4×3×2×1)=210', errorType: 0, relatedProblems: [10, 14, 47] },
    { id: 49, cat: '수리', type: '시간', text: '시속 60km로 180km? 소요시간?', opts: ['2시간', '2.5시간', '3시간', '3.5시간', '4시간'], ans: 2, exp: '180÷60=3시간', errorType: 0, relatedProblems: [3, 11, 50] },
    { id: 50, cat: '수리', type: '시간', text: '시속 100km로 350km? 소요시간?', opts: ['2.5시간', '3시간', '3.5시간', '4시간', '4.5시간'], ans: 2, exp: '350÷100=3.5시간', errorType: 0, relatedProblems: [3, 11, 49] },
    { id: 51, cat: '수리', type: '수익률', text: '200만원 투자 후 260만원. 수익률?', opts: ['25%', '28%', '30%', '32%', '35%'], ans: 2, exp: '(260-200)÷200×100=30%', errorType: 0, relatedProblems: [4, 12, 52] },
    { id: 52, cat: '수리', type: '수익률', text: '50만원 투자 후 65만원. 수익률?', opts: ['28%', '30%', '32%', '34%', '36%'], ans: 1, exp: '(65-50)÷50×100=30%', errorType: 0, relatedProblems: [4, 12, 51] },
    { id: 53, cat: '수리', type: '농도', text: '10% 100ml + 20% 200ml. 농도?', opts: ['15%', '16.67%', '17.5%', '18%', '20%'], ans: 1, exp: '(10+40)÷300×100=16.67%', errorType: 0, relatedProblems: [6, 13, 54] },
    { id: 54, cat: '수리', type: '농도', text: '3% 300ml + 7% 200ml. 농도?', opts: ['4.6%', '5%', '5.4%', '6%', '6.4%'], ans: 0, exp: '(9+14)÷500×100=4.6%', errorType: 0, relatedProblems: [6, 13, 53] },
    { id: 55, cat: '수리', type: '면적', text: '가로 25m, 세로 18m. 넓이?', opts: ['400', '420', '450', '480', '500'], ans: 2, exp: '25×18=450m²', errorType: 0, relatedProblems: [10, 14, 56] },
    { id: 56, cat: '수리', type: '면적', text: '가로 30m, 세로 12m. 넓이?', opts: ['320', '340', '360', '380', '400'], ans: 2, exp: '30×12=360m²', errorType: 0, relatedProblems: [10, 14, 55] },
    { id: 57, cat: '수리', type: '단위', text: '2시간 45분은 몇 분?', opts: ['145', '150', '155', '160', '165'], ans: 3, exp: '120+45=165분', errorType: 0, relatedProblems: [11, 15, 58] },
    { id: 58, cat: '수리', type: '단위', text: '3시간 20분은 몇 분?', opts: ['195', '200', '205', '210', '215'], ans: 1, exp: '180+20=200분', errorType: 0, relatedProblems: [11, 15, 57] },
    
    // 언어 16-30
    { id: 16, cat: '언어', type: '어휘', text: '"파문"의 의미는?', opts: ['파도', '영향', '물리현상', '감정', '보도'], ans: 1, exp: '파문은 사건의 영향을 의미', errorType: 0, relatedProblems: [19, 59, 60] },
    { id: 17, cat: '언어', type: '문법', text: '"그는 극복해왔다" 주어는?', opts: ['태도', '어려움', '그', '극복', '늘'], ans: 2, exp: '그가 주어', errorType: 0, relatedProblems: [18, 20, 61, 62] },
    { id: 18, cat: '언어', type: '문법', text: '올바른 문장은?', opts: ['노력한 결과', '노력의 결과', '노력이 결과', '노력을 결과', '노력이다 결과'], ans: 1, exp: '"~의 결과"가 올바름', errorType: 0, relatedProblems: [17, 20, 61, 62] },
    { id: 19, cat: '언어', type: '어휘', text: '"심오한"의 뜻은?', opts: ['얕은', '깊고 난해한', '명확한', '단순한', '표면적'], ans: 1, exp: '심오=깊고 난해한', errorType: 0, relatedProblems: [16, 59, 60] },
    { id: 20, cat: '언어', type: '띄어쓰기', text: '올바른 띄어쓰기는?', opts: ['할일이', '할 일이', '할일 이', '할 일이많다', '할 일 이많다'], ans: 1, exp: '"할 일이" 올바름', errorType: 0, relatedProblems: [17, 18, 63, 64] },
    { id: 21, cat: '언어', type: '주제', text: '경제와 환경의 관계. 뒷받침하는 것?', opts: ['오염증가', '기술산업', '보존비용', '수익감소', '오염계속'], ans: 1, exp: '환경기술산업이 증명', errorType: 0, relatedProblems: [23, 30, 65, 66] },
    { id: 22, cat: '언어', type: '논리', text: 'A=B, B=C면 A=?', opts: ['C는B', 'B는A', 'A는C', 'C는A', 'B≠C'], ans: 2, exp: '삼단논법: A=C', errorType: 0, relatedProblems: [26, 27, 67, 68] },
    { id: 23, cat: '언어', type: '주제', text: '"기술은 문제도 야기" 주제?', opts: ['부정영향', '균형', '편리함', '역사', '해결책'], ans: 1, exp: '기술발전과 사회문제의 균형', errorType: 0, relatedProblems: [21, 30, 65, 66] },
    { id: 24, cat: '언어', type: '표현', text: '"그의 능력은___ 뛰어나다"', opts: ['어느정도', '매우', '거는', '어렴풋이', '대충'], ans: 1, exp: '"매우"가 적절', errorType: 0, relatedProblems: [26, 69, 70] },
    { id: 25, cat: '언어', type: '순서', text: '③기술혁신, ②일자리, ①경제성장. 순서?', opts: ['③②①', '②③①', '①②③', '③①②', '②①③'], ans: 0, exp: '③②①순서', errorType: 0, relatedProblems: [28, 71, 72] },
    { id: 26, cat: '언어', type: '동의어', text: '"간과"와 비슷한 말?', opts: ['무시', '못봤다', '무심코넘김', '심각히봄', '지적'], ans: 2, exp: '간과=무심코넘김', errorType: 0, relatedProblems: [22, 24, 73, 74] },
    { id: 27, cat: '언어', type: '반대어', text: '"낙관적" 반대말?', opts: ['긍정적', '비관적', '부정적', '소극적', '극단적'], ans: 1, exp: '낙관↔비관', errorType: 0, relatedProblems: [22, 75, 76] },
    { id: 28, cat: '언어', type: '의미', text: '"여러관점" 의미?', opts: ['명확한답', '다양해석', '해석불가', '하나답', '풀수없음'], ans: 1, exp: '다양한 해석 가능', errorType: 0, relatedProblems: [25, 77, 78] },
    { id: 29, cat: '언어', type: '격식', text: '가장 격식있는 표현?', opts: ['뭐해?', '무엇을하고계신가', '뭔가해?', '뭐하세요', '하고있어'], ans: 1, exp: '"무엇을하고계신가"', errorType: 0, relatedProblems: [24, 79, 80] },
    { id: 30, cat: '언어', type: '이해', text: '공정성/효율성 해결법?', opts: ['공정만', '효율만', '균형잡힌접근', '하나버림', '문제거부'], ans: 2, exp: '균형잡힌 접근', errorType: 0, relatedProblems: [21, 23, 81, 82] },
    
    // 언어 추가 59-82
    { id: 59, cat: '언어', type: '어휘', text: '"진부하다"의 뜻은?', opts: ['새롭다', '낡고 뻔하다', '어렵다', '이상하다', '불분명하다'], ans: 1, exp: '진부=낡고 뻔함', errorType: 0, relatedProblems: [16, 19, 60] },
    { id: 60, cat: '언어', type: '어휘', text: '"모순"의 의미는?', opts: ['일치', '배치', '상충', '분명함', '명백함'], ans: 2, exp: '모순은 서로 맞지 않는 상황', errorType: 0, relatedProblems: [16, 19, 59] },
    { id: 61, cat: '언어', type: '문법', text: '"책을 읽다" 목적어는?', opts: ['책', '읽다', '행동', '대상', '결과'], ans: 0, exp: '책이 목적어', errorType: 0, relatedProblems: [17, 18, 62] },
    { id: 62, cat: '언어', type: '문법', text: '올바른 문장?', opts: ['하는 일이', '하일이', '하인 일이', '하를 일이', '하같은 일이'], ans: 0, exp: '"하는 일이" 올바름', errorType: 0, relatedProblems: [17, 18, 61] },
    { id: 63, cat: '언어', type: '띄어쓰기', text: '올바른 띄어쓰기?', opts: ['매우좋다', '매우 좋다', '매우좋 다', '매 우좋다', '매우.좋다'], ans: 1, exp: '"매우 좋다" 올바름', errorType: 0, relatedProblems: [20, 64] },
    { id: 64, cat: '언어', type: '띄어쓰기', text: '올바른 띄어쓰기?', opts: ['어저께', '어제', '어제거', '어 제', '어-제'], ans: 1, exp: '"어제" 올바름', errorType: 0, relatedProblems: [20, 63] },
    { id: 65, cat: '언어', type: '주제', text: '과학과 윤리의 관계. 핵심은?', opts: ['윤리거부', '상충해결', '과학무시', '윤리무시', '기술거부'], ans: 1, exp: '과학발전과 윤리의 조화', errorType: 0, relatedProblems: [21, 23, 66] },
    { id: 66, cat: '언어', type: '주제', text: '"대화의 중요성" 주제?', opts: ['말하기만', '들을뿐', '상호작용', '침묵선호', '개인주의'], ans: 2, exp: '대화의 상호작용 중요성', errorType: 0, relatedProblems: [21, 23, 65] },
    { id: 67, cat: '언어', type: '논리', text: '모든 X는 Y. 이것은 X. 따라서?', opts: ['이것은 Y이다', '이것은 Z이다', 'X는 없다', 'Y는 없다', '불명확'], ans: 0, exp: '논리적으로 이것은 Y', errorType: 0, relatedProblems: [22, 68] },
    { id: 68, cat: '언어', type: '논리', text: 'P→Q, Q→R면 P→?', opts: ['R이다', 'Q이다', '불명확', 'P→P', '역이 아님'], ans: 0, exp: '전이성: P→R', errorType: 0, relatedProblems: [22, 67] },
    { id: 69, cat: '언어', type: '표현', text: '"그것은___ 흥미롭다"', opts: ['약간', '상당히', '거의', '끝내', '사실상'], ans: 1, exp: '"상당히"가 적절', errorType: 0, relatedProblems: [24, 70] },
    { id: 70, cat: '언어', type: '표현', text: '"결과가___ 명확하다"', opts: ['거의', '매우', '약간', '어렴풋이', '깜빡'], ans: 1, exp: '"매우"가 적절', errorType: 0, relatedProblems: [24, 69] },
    { id: 71, cat: '언어', type: '순서', text: '②결론 ①전개 ③도입. 순서?', opts: ['①②③', '③①②', '②①③', '③②①', '①③②'], ans: 1, exp: '③①②순서', errorType: 0, relatedProblems: [25, 72] },
    { id: 72, cat: '언어', type: '순서', text: '③해결 ①문제 ②분석. 순서?', opts: ['③②①', '①②③', '②③①', '①③②', '③①②'], ans: 1, exp: '①②③순서', errorType: 0, relatedProblems: [25, 71] },
    { id: 73, cat: '언어', type: '동의어', text: '"회피"와 비슷한 말?', opts: ['접근', '직시', '기피', '직면', '맞닥뜨림'], ans: 2, exp: '회피=피하기', errorType: 0, relatedProblems: [26, 74] },
    { id: 74, cat: '언어', type: '동의어', text: '"추종"과 비슷한 말?', opts: ['반대', '지지', '거부', '협력', '비판'], ans: 1, exp: '추종=따르기', errorType: 0, relatedProblems: [26, 73] },
    { id: 75, cat: '언어', type: '반대어', text: '"이기적" 반대말?', opts: ['개인적', '자기중심', '이타적', '무관심', '개인주의'], ans: 2, exp: '이기적↔이타적', errorType: 0, relatedProblems: [27, 76] },
    { id: 76, cat: '언어', type: '반대어', text: '"진지한" 반대말?', opts: ['무거운', '가벼운', '느낀', '심각한', '엄숙한'], ans: 1, exp: '진지↔가벼움', errorType: 0, relatedProblems: [27, 75] },
    { id: 77, cat: '언어', type: '의미', text: '"상황해석" 의미?', opts: ['하나의뜻', '고정적', '다양한관점', '명확성', '절대성'], ans: 2, exp: '상황에 따라 다양한 해석 가능', errorType: 0, relatedProblems: [28, 78] },
    { id: 78, cat: '언어', type: '의미', text: '"관점의차이" 의미?', opts: ['틀림', '옳음', '입장차이', '오류', '거짓'], ans: 2, exp: '다양한 관점의 차이 표현', errorType: 0, relatedProblems: [28, 77] },
    { id: 79, cat: '언어', type: '격식', text: '가장 격식있는 표현?', opts: ['먹어', '먹습니다', '먹는다', '먹고있어', '먹을래'], ans: 1, exp: '"먹습니다" 격식있음', errorType: 0, relatedProblems: [29, 80] },
    { id: 80, cat: '언어', type: '격식', text: '가장 격식있는 표현?', opts: ['갔어', '갔다', '가셨습니다', '가버렸어', '갈래'], ans: 2, exp: '"가셨습니다" 격식있음', errorType: 0, relatedProblems: [29, 79] },
    { id: 81, cat: '언어', type: '이해', text: '효율성/형평성 균형?', opts: ['효율우선', '형평우선', '둘다무시', '조화로운균형', '선택불가'], ans: 3, exp: '둘의 균형잡힌 접근 필요', errorType: 0, relatedProblems: [30, 82] },
    { id: 82, cat: '언어', type: '이해', text: '개인/사회의 관계 해결책?', opts: ['개인무시', '사회무시', '상호존중', '타협거부', '갈등필연'], ans: 2, exp: '개인과 사회의 조화로운 관계', errorType: 0, relatedProblems: [30, 81] }
];

let current = null;
let answers = {};
let times = {};
let startTime = Date.now();
let problemStart = null;
let problemTimes = {};
let timeAlertShown = {};
let examOver = false;
let reviewMode = false;
let wrongNoteMode = false;

// ==================== 오답노트 저장소 ====================
let wrongNote = [];  // 현재 시험의 오답
let allWrongNotes = JSON.parse(localStorage.getItem('ncsWrongNotes') || '[]');  // 전체 저장된 오답

// 로컬스토리지에서 오답노트 복구
function loadWrongNotes() {
    allWrongNotes = JSON.parse(localStorage.getItem('ncsWrongNotes') || '[]');
}

// 로컬스토리지에 오답노트 저장
function saveWrongNotes() {
    localStorage.setItem('ncsWrongNotes', JSON.stringify(allWrongNotes));
}

// 오답 추가
function addToWrongNote(problemId, errorTypeSelected) {
    const problem = problems.find(p => p.id === problemId);
    const existingNote = allWrongNotes.find(n => n.id === problemId);
    
    const newNote = {
        id: problemId,
        cat: problem.cat,
        type: problem.type,
        text: problem.text,
        userAns: answers[problemId],
        correctAns: problem.ans,
        exp: problem.exp,
        errorType: errorTypeSelected || 0,
        firstWrongDate: existingNote ? existingNote.firstWrongDate : new Date().toISOString(),
        nextReviewDates: existingNote ? existingNote.nextReviewDates : CONFIG.SPACED_REPETITION.map(days => {
            const d = new Date();
            d.setDate(d.getDate() + days);
            return d.toISOString().split('T')[0];
        }),
        reviewCount: existingNote ? existingNote.reviewCount + 1 : 1
    };
    
    if (existingNote) {
        const idx = allWrongNotes.indexOf(existingNote);
        allWrongNotes[idx] = newNote;
    } else {
        allWrongNotes.push(newNote);
    }
    
    saveWrongNotes();
}

// ==================== 초기화 ====================
function init() {
    // 문제 배열을 번호 순서대로 정렬
    problems.sort((a, b) => a.id - b.id);
    
    loadWrongNotes();
    renderProblems();
    startTimer();
}

// ==================== UI 렌더링 ====================
// 문제 목록 렌더링
function renderProblems() {
    const list = document.getElementById('problem-list');
    list.innerHTML = problems.map(p => 
        `<button class="problem-btn" id="btn-${p.id}" onclick="showProblem(${p.id})">
            ${p.id}. ${p.type}
        </button>`
    ).join('');
}

// 문제 표시
function showProblem(id, review) {
    if (examOver && !review) return;
    
    if (review) {
        reviewMode = true;
        document.getElementById('problem-view').style.display = 'block';
        document.getElementById('result-view').classList.remove('show');
    }
    
    current = id;
    problemStart = Date.now();
    timeAlertShown[id] = false;
    
    const p = problems.find(x => x.id === id);
    document.querySelectorAll('.problem-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`btn-${id}`);
    if (btn) btn.classList.add('active');
    
    const view = document.getElementById('problem-view');
    const opts = p.opts.map((o, i) => 
        `<label class="option">
            <input type="radio" name="ans" value="${i}" ${answers[id] === i ? 'checked' : ''}>
            ${String.fromCharCode(65+i)}. ${o}
        </label>`
    ).join('');

    const exp = answers[id] !== undefined ? 
        `<div class="explanation show">
            <h4>${answers[id] === p.ans ? '✅ 정답!' : '❌ 오답'}</h4>
            <p>${p.exp}</p>
        </div>` : '';

    const reviewBtn = reviewMode ? '<button class="btn-next" onclick="backToResult()">결과로 돌아가기</button>' : '';

    view.innerHTML = `
        <div class="problem-card">
            <h2 style="color: #667eea; margin-bottom: 20px;">${p.id}번 - ${p.cat} ${p.type}</h2>
            <div class="problem-text">${p.text}</div>
            <div class="options">${opts}</div>
            ${exp}
            <div class="buttons">
                ${reviewMode ? `<button class="btn-skip" onclick="backToResult()">돌아가기</button>` : `<button class="btn-skip" onclick="skip()">넘어가기</button>`}
                <button class="btn-submit" onclick="submit()">정답 제출</button>
                ${answers[id] !== undefined ? reviewBtn : ''}
            </div>
        </div>`;

    document.querySelectorAll('input[name="ans"]').forEach(r => {
        r.addEventListener('change', e => answers[id] = parseInt(e.target.value));
    });

    document.getElementById('title').textContent = `${p.id}번 문제 ${review ? '(복습)' : ''}`;
    checkTime();
}

// 결과로 돌아가기
function backToResult() {
    reviewMode = false;
    document.getElementById('problem-view').style.display = 'none';
    document.getElementById('result-view').classList.add('show');
}

// ==================== 정답 제출 & 스킵 ====================
// 정답 제출
function submit() {
    if (answers[current] === undefined) {
        alert('정답을 선택하세요');
        return;
    }
    times[current] = (Date.now() - problemStart) / 1000;
    
    // 오답인 경우 오답노트 저장 옵션 표시
    const p = problems.find(x => x.id === current);
    if (answers[current] !== p.ans) {
        showErrorTypeSelector(current);
        return;
    }
    
    updateUI();
    showProblem(current);
}

// 시간 확인
function checkTime() {
    if (!current || examOver) return;
    
    const t = problemTimes[current] = (Date.now() - problemStart) / 1000;
    const p = problems.find(x => x.id === current);
    const avgCat = getAvgTime(p.cat);
    
    if (t > CONFIG.TIME_ALERT_SEC && t < CONFIG.TIME_ALERT_SEC + 1 && !timeAlertShown[current]) {
        timeAlertShown[current] = true;
        showAlarmAndPopup(Math.floor(t), Math.floor(avgCat));
    }
}

// ==================== 시간 초과 알림 ====================
// 알람음 + 팝업 표시
function showAlarmAndPopup(time, avg) {
    playAlarmSequence();
    
    document.getElementById('alert-time').textContent = time;
    document.getElementById('alert-avg').textContent = avg;
    document.getElementById('time-alert').classList.add('show');
}

// 강렬한 연속 알람음
function playAlarmSequence() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.frequency.value = 1400;
                gain.gain.setValueAtTime(0.6, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            }, i * 150);
        }
    } catch (e) {}
}

// 팝업 닫기
function closeTimeAlert() {
    document.getElementById('time-alert').classList.remove('show');
}

// 다음 문제 + 팝업 닫기
function skipAndClose() {
    closeTimeAlert();
    skip();
}

// 오답 원인 선택 화면
function showErrorTypeSelector(problemId) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'error-type-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 style="margin-bottom: 10px;">❌ 오답을 저장하시겠습니까?</h2>
            <p style="color: #666; margin-bottom: 20px;">틀린 원인을 선택하면 오답노트에 저장됩니다.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                ${Object.entries(ERROR_TYPES).filter(([k]) => k !== '0').map(([key, tag]) => `
                    <button onclick="confirmError(${problemId}, ${key})" style="
                        padding: 15px;
                        border: 2px solid ${tag.color};
                        background: white;
                        color: ${tag.color};
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.2s;
                    " onmouseover="this.style.background='${tag.color}'; this.style.color='white';"
                       onmouseout="this.style.background='white'; this.style.color='${tag.color}';">
                        ${tag.icon} ${tag.name}
                    </button>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="modal-btn modal-btn-secondary" style="flex: 1;" onclick="closeErrorModal()">
                    저장하지 않기
                </button>
                <button class="modal-btn modal-btn-secondary" style="flex: 1;" onclick="confirmError(${problemId}, 0)">
                    나중에 분류
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 오답 원인 확정
function confirmError(problemId, errorType) {
    addToWrongNote(problemId, errorType);
    closeErrorModal();
    updateUI();
    showProblem(problemId);
}

// 오답 모달 닫기
function closeErrorModal() {
    const modal = document.getElementById('error-type-modal');
    if (modal) modal.remove();
}

// ==================== 오답노트 화면 ====================
// 오답노트 표시
function showWrongNote() {
    wrongNoteMode = true;
    document.getElementById('problem-view').style.display = 'none';
    document.getElementById('result-view').classList.remove('show');
    document.getElementById('wrong-note-view').classList.add('show');
    document.getElementById('title').textContent = '📝 오답노트';
    
    loadWrongNotes();
    renderWrongNotes();
}

// 오답노트 렌더링
function renderWrongNotes() {
    const view = document.getElementById('wrong-note-view');
    
    if (allWrongNotes.length === 0) {
        view.innerHTML = `
            <div class="problem-card" style="text-align: center; padding: 60px;">
                <p style="font-size: 1.2em; color: #999;">저장된 오답이 없습니다</p>
            </div>
        `;
        return;
    }
    
    // 오답 원인별로 그룹화
    const grouped = {};
    allWrongNotes.forEach(note => {
        if (!grouped[note.errorType]) grouped[note.errorType] = [];
        grouped[note.errorType].push(note);
    });
    
    let html = `
        <div class="problem-card">
            <h2 style="color: #667eea; margin-bottom: 20px;">💡 저장된 오답 ${allWrongNotes.length}개</h2>
            <p style="color: #666; margin-bottom: 30px;">에빙하우스 곡선 기반 복습 스케줄: [즉시, 1일, 3일, 7일]</p>
    `;
    
    Object.entries(grouped).forEach(([errorType, notes]) => {
        const tag = ERROR_TYPES[errorType] || ERROR_TYPES[0];
        html += `
            <div style="margin-bottom: 30px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <div style="background: ${tag.color}; color: white; padding: 8px 15px; border-radius: 20px; font-weight: 600; font-size: 0.9em;">
                        ${tag.icon} ${tag.name} (${notes.length}개)
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
        `;
        
        notes.forEach(note => {
            const problem = problems.find(p => p.id === note.id);
            html += `
                <div style="background: #f9fafb; border: 2px solid ${tag.color}; padding: 15px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                        <div>
                            <strong style="color: #333;">${note.id}번 - ${note.type}</strong>
                            <div style="color: #999; font-size: 0.85em;">${note.cat}</div>
                        </div>
                        <button onclick="removeFromWrongNote(${note.id})" style="
                            background: none;
                            border: none;
                            color: #dc3545;
                            cursor: pointer;
                            font-size: 1.2em;
                        ">✕</button>
                    </div>
                    
                    <div style="background: white; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                        <p style="color: #666; font-size: 0.9em; margin-bottom: 8px; line-height: 1.5;">${note.text}</p>
                        <div style="color: #999; font-size: 0.85em;">
                            정답: ${String.fromCharCode(65 + note.correctAns)} / 당신의 답: ${String.fromCharCode(65 + note.userAns)}
                        </div>
                    </div>
                    
                    <div style="background: #e7f3ff; padding: 10px; border-radius: 6px; margin-bottom: 10px; font-size: 0.9em; border-left: 3px solid #2196F3;">
                        <strong style="color: #333;">풀이</strong>: ${note.exp}
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; font-size: 0.85em;">
                        ${note.nextReviewDates.map((date, idx) => {
                            const today = new Date().toISOString().split('T')[0];
                            const isDue = date <= today;
                            return `
                                <div style="background: ${isDue ? '#fff3cd' : '#f0f2f5'}; padding: 8px; border-radius: 4px; text-align: center;">
                                    <div style="color: ${isDue ? '#856404' : '#666'}; font-weight: 600;">${idx === 0 ? '즉' : date.split('-')[2].replace(/^0/, '')}일</div>
                                    <div style="color: ${isDue ? '#856404' : '#999'}; font-size: 0.8em;">${date}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    });
    
    html += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <button onclick="backFromWrongNote()" class="btn-next" style="width: 100%;">돌아가기</button>
        </div>
    </div>`;
    
    view.innerHTML = html;
}

// 오답노트에서 제거
function removeFromWrongNote(problemId) {
    allWrongNotes = allWrongNotes.filter(n => n.id !== problemId);
    saveWrongNotes();
    renderWrongNotes();
    updateUI();
}

// 오답노트에서 돌아가기
function backFromWrongNote() {
    wrongNoteMode = false;
    document.getElementById('problem-view').style.display = 'block';
    document.getElementById('wrong-note-view').classList.remove('show');
    document.getElementById('title').textContent = '문제를 선택하세요';
}

// ==================== 통계 계산 ====================
// UI 업데이트
function updateUI() {
    const solved = Object.keys(answers).length;
    const correct = Object.entries(answers).filter(([id, ans]) => 
        problems.find(p => p.id === parseInt(id)).ans === ans
    ).length;
    
    document.getElementById('solved').textContent = solved;
    document.getElementById('accuracy').textContent = solved > 0 ? Math.round(correct/solved*100) + '%' : '0%';
    
    // 결과 보기 버튼 표시
    const resultBtn = document.getElementById('result-btn');
    if (solved > 0) {
        resultBtn.style.display = 'block';
    }
    
    // 오답노트 버튼 표시
    const wrongNoteBtn = document.getElementById('wrong-note-btn');
    if (allWrongNotes.length > 0) {
        wrongNoteBtn.style.display = 'block';
        document.getElementById('wrong-count').textContent = allWrongNotes.length;
    }
    
    problems.forEach(p => {
        const btn = document.getElementById(`btn-${p.id}`);
        if (answers[p.id] !== undefined) {
            btn.classList.add(answers[p.id] === p.ans ? 'solved' : 'wrong');
        }
    });
}

// 평균시간
function getAvgTime(cat) {
    const items = Object.entries(times).filter(([id]) => 
        problems.find(p => p.id === parseInt(id)).cat === cat
    );
    if (!items.length) return 60;
    return items.reduce((s, [, t]) => s + t, 0) / items.length;
}

// 오답 원인 태그 (ERROR_TYPES 사용)
function getErrorTypeTag(errorType) {
    return ERROR_TYPES[errorType] || ERROR_TYPES[0];
}

// 시험 종료
function endExam() {
    examOver = true;
    const correct = Object.entries(answers).filter(([id, ans]) => 
        problems.find(p => p.id === parseInt(id)).ans === ans
    ).length;
    const total = Object.keys(answers).length;
    const score = Math.round(correct / CONFIG.TOTAL_PROBLEMS * 100);

    const wrongProblems = Object.entries(answers)
        .filter(([id, ans]) => {
            const p = problems.find(x => x.id === parseInt(id));
            return p.ans !== ans;
        })
        .map(([id, ans]) => {
            const p = problems.find(x => x.id === parseInt(id));
            return { id: parseInt(id), problem: p, userAns: ans };
        });

    const topSlow = Object.entries(problemTimes || times)
        .map(([id, t]) => ({ id: parseInt(id), t }))
        .sort((a, b) => b.t - a.t)
        .slice(0, 5);

    let wrongAnalysisHtml = '';
    if (wrongProblems.length > 0) {
        wrongAnalysisHtml = `
            <h3 style="color: #dc3545; margin-top: 30px; margin-bottom: 20px;">❌ 오답 분석 (${wrongProblems.length}개)</h3>
            ${wrongProblems.map(item => {
                const tag = getErrorTypeTag(item.problem.errorType);
                const relatedIds = item.problem.relatedProblems || [];
                const relatedProbs = relatedIds
                    .filter(id => problems.find(p => p.id === id))
                    .slice(0, 3);
                
                return `
                    <div style="background: #fff3cd; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #dc3545; text-align: left;">
                        <div style="margin-bottom: 15px;">
                            <h4 style="color: #333; margin-bottom: 10px;">${item.id}번 - ${item.problem.cat} ${item.problem.type}</h4>
                            <p style="color: #666; margin-bottom: 15px; line-height: 1.6;">${item.problem.text}</p>
                        </div>
                        
                        <div style="background: white; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
                            <div style="color: #666; font-size: 0.9em; margin-bottom: 8px;"><strong>풀이</strong></div>
                            <div style="color: #333; font-weight: bold;">${item.problem.exp}</div>
                            <div style="color: #999; font-size: 0.85em; margin-top: 8px;">정답: ${String.fromCharCode(65 + item.problem.ans)} / 당신의 답: ${String.fromCharCode(65 + item.userAns)}</div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <div style="background: ${tag.color}; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; font-size: 0.9em;">
                                ${tag.icon} ${tag.name}
                            </div>
                            <div style="color: #666; font-size: 0.9em;">
                                같은 유형의 문제를 복습하세요
                            </div>
                        </div>
                        
                        ${relatedProbs.length > 0 ? `
                            <div style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #ddd;">
                                <div style="color: #667eea; font-weight: bold; margin-bottom: 10px; font-size: 0.9em;">📚 유사 문제 ${relatedProbs.length}개</div>
                                <div style="display: grid; grid-template-columns: repeat(${relatedProbs.length}, 1fr); gap: 10px;">
                                    ${relatedProbs.map(relId => {
                                        const rel = problems.find(p => p.id === relId);
                                        const isCorrect = answers[relId] !== undefined && answers[relId] === rel.ans;
                                        return `
                                            <button onclick="showProblem(${relId}, true)" style="
                                                padding: 10px;
                                                border: 1px solid #667eea;
                                                background: ${isCorrect ? '#e8f5e9' : '#f3e5f5'};
                                                color: #333;
                                                border-radius: 6px;
                                                cursor: pointer;
                                                font-weight: 600;
                                                font-size: 0.9em;
                                                transition: all 0.2s;
                                            " onmouseover="this.style.background='#667eea'; this.style.color='white';"
                                               onmouseout="this.style.background='${isCorrect ? '#e8f5e9' : '#f3e5f5'}'; this.style.color='#333';">
                                                ${rel.id}번 ${isCorrect ? '✅' : '?'}
                                            </button>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        `;
    }

    let html = `
        <div class="problem-card" style="text-align: center;">
            <div class="result-score">${score}점</div>
            <h2 style="color: #667eea; margin-bottom: 30px;">시험 종료!</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                <div style="background: #f0f2f5; padding: 20px; border-radius: 8px;">
                    <div style="color: #667eea; font-weight: bold;">정답률</div>
                    <div style="font-size: 1.5em; margin-top: 10px;">${correct}/${total}</div>
                </div>
                <div style="background: #f0f2f5; padding: 20px; border-radius: 8px;">
                    <div style="color: #667eea; font-weight: bold;">풀이</div>
                    <div style="font-size: 1.5em; margin-top: 10px;">${total}/30</div>
                </div>
                <div style="background: #f0f2f5; padding: 20px; border-radius: 8px;">
                    <div style="color: #667eea; font-weight: bold;">소요시간</div>
                    <div style="font-size: 1.5em; margin-top: 10px;">${Math.floor((Date.now()-startTime)/60000)}분</div>
                </div>
            </div>
            
            ${wrongAnalysisHtml}
            
            <h3 style="color: #dc3545; margin-top: 30px; margin-bottom: 20px;">⏱️ 가장 오래 걸린 문제 TOP 5</h3>
            ${topSlow.map((item, i) => {
                const p = problems.find(x => x.id === item.id);
                return `
                    <div style="background: #f9fafb; padding: 15px; margin: 10px 0; border-radius: 6px; text-align: left;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>${i+1}위. ${p.cat} ${p.type} (${p.id}번)</strong>
                            <span style="color: #dc3545; font-weight: bold;">${Math.floor(item.t)}초</span>
                        </div>
                    </div>
                `;
            }).join('')}
            
            <button class="btn-next" onclick="location.reload()" style="width: 100%; margin-top: 20px;">다시 풀기</button>
        </div>
    `;
    
    document.getElementById('problem-view').style.display = 'none';
    document.getElementById('result-view').classList.add('show');
    document.getElementById('result-view').innerHTML = html;
}

// ==================== 타이머 ====================
// 시험 진행 시간 추적 및 UI 업데이트
function startTimer() {
    let sec = CONFIG.TIME_LIMIT_SEC;
    setInterval(() => {
        if (sec > 0 && !examOver) {
            sec--;
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            const display = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            document.getElementById('timer-display').textContent = display;
            document.getElementById('main-timer').textContent = display;
            
            const el = document.getElementById('main-timer');
            if (sec < CONFIG.DANGER_THRESHOLD) {
                el.classList.add('danger');
            } else if (sec < CONFIG.WARNING_THRESHOLD) {
                el.classList.add('warning');
            }
            
            if (sec === 0) endExam();
        }
    }, 1000);

    setInterval(checkTime, 100);
}

// ==================== 실행 ====================
init();
