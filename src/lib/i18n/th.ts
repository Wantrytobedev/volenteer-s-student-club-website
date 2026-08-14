/**
 * ข้อความ UI ทั้งหมดของเว็บไซต์ — ภาษาไทยเป็นหลัก ตามกฎใน CLAUDE.md
 * เก็บรวมไว้ที่นี่ที่เดียว ห้าม hardcode ข้อความ UI กระจายในไฟล์อื่น
 */
export const th = {
  siteName: "ชมรมอาสาพัฒนา",
  siteFullName:
    "ชมรมอาสาพัฒนา มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ (กรุงเทพ)",
  siteDescription:
    "เว็บไซต์ชมรมอาสาพัฒนา มจพ. แนะนำกิจกรรมค่ายอาสา รับสมัครสมาชิก และเปิดรับการสนับสนุนจากสปอนเซอร์",

  nav: {
    home: "หน้าแรก",
    about: "เกี่ยวกับเรา",
    camps: "ค่ายอาสา",
    calendar: "ปฏิทินกิจกรรม",
    sponsor: "ร่วมสนับสนุน",
    menu: "เมนู",
    closeMenu: "ปิดเมนู",
  },

  home: {
    heroEyebrow: "ชมรมอาสาพัฒนา มจพ.",
    heroTitle: "ลงพื้นที่ ลงมือทำ พัฒนาไปด้วยกัน",
    heroSubtitle:
      "ชมรมนักศึกษาที่จัดค่ายอาสาพัฒนาต่อเนื่องทุกปี เปิดพื้นที่ให้นักศึกษาได้เรียนรู้การทำงานเพื่อสังคมจริง ผ่านค่ายจุดประกาย ค่ายสร้าง และค่ายวันเด็ก",
    ctaSeeCamps: "ดูค่ายที่เปิดรับสมัคร",
    ctaAbout: "รู้จักชมรมเรา",
    upcomingCampsTitle: "ค่ายที่กำลังจะมาถึง",
    upcomingCampsEmpty: "ยังไม่มีค่ายที่เปิดเผยแพร่ในตอนนี้ ติดตามได้เร็ว ๆ นี้",
    seeAllCamps: "ดูค่ายทั้งหมด",
    missionTitle: "สิ่งที่เราทำ",
    missionItems: [
      {
        title: "จัดค่ายอาสาพัฒนา",
        description: "ค่ายจุดประกาย ค่ายสร้าง และค่ายวันเด็ก ปีละ 3 ค่าย",
      },
      {
        title: "พัฒนานักศึกษา",
        description: "เปิดพื้นที่เรียนรู้การทำงานเป็นทีมและจิตอาสานอกห้องเรียน",
      },
      {
        title: "ร่วมมือกับสปอนเซอร์",
        description: "เปิดรับการสนับสนุนจากองค์กรที่อยากร่วมพัฒนาชุมชน",
      },
    ],
  },

  about: {
    title: "เกี่ยวกับชมรม",
    subtitle:
      "รู้จักที่มา พันธกิจ และค่ายประจำปีของชมรมอาสาพัฒนา มจพ.",
    missionTitle: "พันธกิจ",
    missionBody:
      "ชมรมอาสาพัฒนามุ่งสร้างพื้นที่ให้นักศึกษาได้ลงมือทำกิจกรรมเพื่อสังคมจริง ผ่านค่ายอาสาที่จัดต่อเนื่องเป็นประจำทุกปี ควบคู่ไปกับการพัฒนาทักษะการทำงานเป็นทีม ภาวะผู้นำ และจิตสำนึกสาธารณะของสมาชิก",
    campsHeading: "ค่ายประจำปีของเรา",
    contactHeading: "ช่องทางติดต่อ",
  },

  camps: {
    title: "ค่ายอาสา",
    subtitle: "ติดตามกำหนดการและสมัครเข้าร่วมค่ายอาสาของชมรม",
    statusOpen: "กำลังเปิดรับสมัคร",
    statusUpcoming: "กำลังจะมาถึง",
    statusPast: "ผ่านมาแล้ว",
    empty: "ยังไม่มีค่ายที่เผยแพร่ในตอนนี้",
    deadlineLabel: "ปิดรับสมัคร",
    locationLabel: "สถานที่",
    capacityLabel: "รับจำนวน",
    capacityUnit: "คน",
    viewDetail: "ดูรายละเอียด",
  },

  campDetail: {
    backToList: "กลับไปหน้าค่ายทั้งหมด",
    aboutHeading: "รายละเอียดค่าย",
    applyHeading: "สมัครเข้าร่วมค่าย",
    applyClosedNotice: "ค่ายนี้ปิดรับสมัครแล้ว หรือยังไม่เปิดรับสมัครในขณะนี้",
    applyPastNotice: "ค่ายนี้จบกิจกรรมไปแล้ว",
  },

  applicationForm: {
    fullName: "ชื่อ-นามสกุล",
    phone: "เบอร์โทรศัพท์",
    email: "อีเมล",
    submit: "ส่งใบสมัคร",
    submitting: "กำลังส่ง...",
    successTitle: "ส่งใบสมัครสำเร็จ",
    successBody:
      "ทีมงานได้รับใบสมัครของคุณแล้ว จะติดต่อกลับผ่านอีเมลที่ให้ไว้ กรุณาตรวจสอบอีเมล (รวมถึงถังจดหมายขยะ)",
    errorTitle: "ส่งใบสมัครไม่สำเร็จ",
    errorGeneric: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
  },

  sponsor: {
    title: "ร่วมสนับสนุนชมรม",
    subtitle:
      "ทุกการสนับสนุนช่วยให้ชมรมจัดค่ายอาสาพัฒนาต่อเนื่องได้ทุกปี และส่งต่อโอกาสให้ชุมชนที่เราลงพื้นที่",
    whyHeading: "ทำไมควรสนับสนุนเรา",
    whyBody:
      "ชมรมอาสาพัฒนาจัดค่ายอาสาต่อเนื่องเป็นประจำทุกปี เข้าถึงนักศึกษาและชุมชนในหลายพื้นที่ การสนับสนุนจากองค์กรของท่านจะถูกนำไปใช้พัฒนาคุณภาพค่ายและขยายผลกระทบเชิงบวกต่อชุมชนโดยตรง",
    contactHeading: "ติดต่อทีมงาน",
    formHeading: "ส่งข้อความถึงเรา",
  },

  sponsorForm: {
    organizationName: "ชื่อองค์กร",
    contactName: "ชื่อผู้ติดต่อ",
    email: "อีเมล",
    phone: "เบอร์โทรศัพท์ (ถ้ามี)",
    message: "ข้อความ",
    submit: "ส่งข้อความ",
    submitting: "กำลังส่ง...",
    successTitle: "ส่งข้อความสำเร็จ",
    successBody: "ทีมงานได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด",
    errorTitle: "ส่งข้อความไม่สำเร็จ",
    errorGeneric: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
  },

  calendar: {
    title: "ปฏิทินกิจกรรม",
    subtitle: "ภาพรวมกำหนดการค่ายและกิจกรรมของชมรมตลอดปี",
    prevMonth: "เดือนก่อนหน้า",
    nextMonth: "เดือนถัดไป",
    today: "วันนี้",
    noEventsInMonth: "ไม่มีกิจกรรมในเดือนนี้",
    addToGoogleCalendar: "เพิ่มลง Google Calendar",
  },

  footer: {
    contactHeading: "ติดต่อเรา",
    followHeading: "ติดตามเรา",
    facebookLabel: "Facebook",
    instagramLabel: "Instagram",
    phoneLabel: "โทร",
    rightsReserved: "สงวนลิขสิทธิ์",
  },

  common: {
    loading: "กำลังโหลด...",
    somethingWentWrong: "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง",
  },
} as const;

export const siteContact = {
  facebookUrl: "https://web.facebook.com/KmutnbArsa?locale=th_TH",
  facebookHandle: "ชมรมอาสาพัฒนา พระจอมเกล้าพระนครเหนือ",
  instagramUrl: "https://www.instagram.com/arsa.pattana_kmutnb/",
  instagramHandle: "@arsa.pattana_kmutnb",
  phone: "094-885-4271",
} as const;
