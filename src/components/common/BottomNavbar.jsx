import { FaUser, FaBook, FaChartBar, FaCommentDots } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

// 순서: 대시보드, 가계부, 챗봇, 내정보
const navs = [
  { name: "dashboard", label: "대시보드", icon: <FaChartBar />, link: "/dashboard" },
  { name: "ledger", label: "가계부", icon: <FaBook />, link: "/ledger" },
  { name: "chatbot", label: "챗봇", icon: <FaCommentDots />, link: "/chatbot" },
  { name: "mypage", label: "내 정보", icon: <FaUser />, link: "/mypage" },
];

function BottomNavbar({ active }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        zIndex: 100,
      }}
    >
      {navs.map((nav) => {
        const isActive =
          active === nav.name ||
          location.pathname.startsWith(nav.link);

        return (
          <button
            key={nav.name}
            onClick={() => navigate(nav.link)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: isActive ? "#4B4BFF" : "#888",
              fontWeight: isActive ? 700 : 500,
              fontSize: 13,
              cursor: "pointer",
              padding: "8px 0",
            }}
          >
            <span style={{ fontSize: 22, marginBottom: 2 }}>{nav.icon}</span>
            {nav.label}
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavbar;