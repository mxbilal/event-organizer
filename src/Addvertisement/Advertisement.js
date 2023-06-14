import React from "react";
import "./Advertisement.scss";
const Advertisement = () => {
  return (
    <>
      <div className="advertisement-main">
        <div className="ads-heading">
          <div className="ads-heading-cols-1">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 0C6.28075 0 0 6.28075 0 14C0 21.7192 6.28075 28 14 28C21.7192 28 28 21.7192 28 14C28 6.28075 21.7192 0 14 0ZM20.4225 20.209C20.3566 20.3031 20.2729 20.3833 20.176 20.445C20.0791 20.5067 19.9709 20.5486 19.8578 20.5685C19.7447 20.5883 19.6287 20.5856 19.5166 20.5606C19.4045 20.5355 19.2984 20.4886 19.2045 20.4225C15.9233 18.116 10.465 17.9883 6.7795 18.8475C6.66747 18.8735 6.55141 18.8771 6.43797 18.8582C6.32453 18.8394 6.21591 18.7983 6.11833 18.7375C6.02075 18.6766 5.93611 18.5971 5.86924 18.5035C5.80238 18.41 5.75459 18.3042 5.72862 18.1921C5.70266 18.0801 5.69901 17.964 5.71789 17.8506C5.73677 17.7372 5.77781 17.6285 5.83867 17.531C5.89953 17.4334 5.97901 17.3487 6.07258 17.2819C6.16614 17.215 6.27197 17.1672 6.384 17.1413C10.4353 16.2033 16.4902 16.3748 20.209 18.991C20.3987 19.1243 20.5277 19.3275 20.5678 19.5558C20.6078 19.7842 20.5555 20.0191 20.4225 20.209ZM22.1305 16.7948C22.0634 16.8881 21.9786 16.9673 21.8809 17.0278C21.7832 17.0883 21.6745 17.129 21.5611 17.1476C21.4476 17.1661 21.3317 17.1621 21.2198 17.1358C21.1079 17.1095 21.0023 17.0614 20.909 16.9943C17.1028 14.2625 12.4268 13.5835 6.18625 14.8575C6.07364 14.8806 5.95759 14.8813 5.84471 14.8595C5.73184 14.8378 5.62435 14.794 5.52839 14.7307C5.43244 14.6674 5.34988 14.5858 5.28545 14.4906C5.22102 14.3954 5.17597 14.2885 5.15287 14.1759C5.12978 14.0633 5.12909 13.9472 5.15084 13.8343C5.1726 13.7215 5.21637 13.614 5.27967 13.518C5.34296 13.4221 5.42454 13.3395 5.51974 13.2751C5.61493 13.2106 5.72189 13.1656 5.8345 13.1425C12.5843 11.7653 17.6978 12.5352 21.9293 15.5715C22.1177 15.7073 22.2447 15.9123 22.2824 16.1416C22.3202 16.3708 22.2655 16.6057 22.1305 16.7948ZM23.856 12.2098C23.7915 12.305 23.7088 12.3865 23.6128 12.4497C23.5167 12.513 23.4091 12.5567 23.2961 12.5783C23.1832 12.5999 23.067 12.599 22.9544 12.5757C22.8418 12.5524 22.7349 12.5072 22.6398 12.4425C17.815 9.16825 10.4808 9.1525 5.733 10.8325C5.62453 10.8708 5.50958 10.8873 5.39472 10.8811C5.27987 10.875 5.16735 10.8462 5.06359 10.7966C4.95983 10.747 4.86687 10.6774 4.79 10.5918C4.71314 10.5062 4.65389 10.4063 4.61562 10.2979C4.57736 10.1894 4.56084 10.0745 4.567 9.9596C4.57316 9.84474 4.60188 9.73222 4.65152 9.62846C4.70117 9.5247 4.77076 9.43174 4.85633 9.35488C4.94191 9.27802 5.04178 9.21876 5.15025 9.1805C10.3145 7.35525 18.3172 7.39375 23.625 10.9935C23.8162 11.1247 23.9479 11.3262 23.9911 11.554C24.0344 11.7819 23.9858 12.0176 23.856 12.2098Z"
                fill="#1FD662"
              />
            </svg>
            <p>Spotify Premium</p>
          </div>
          <div className="ads-heading-cols-2">
            <svg
              style={{ cursor: "pointer" }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 1.2C4.2504 1.2 1.2 4.2504 1.2 8C1.2 11.7496 4.2504 14.8 8 14.8C11.7496 14.8 14.8 11.7496 14.8 8C14.8 4.2504 11.7496 1.2 8 1.2ZM8 16C3.5888 16 0 12.4112 0 8C0 3.5888 3.5888 0 8 0C12.4112 0 16 3.5888 16 8C16 12.4112 12.4112 16 8 16Z"
                fill="#F8F8F8"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99526 9.0985C7.66406 9.0985 7.39526 8.8297 7.39526 8.4985V4.96328C7.39526 4.63208 7.66406 4.36328 7.99526 4.36328C8.32646 4.36328 8.59526 4.63208 8.59526 4.96328V8.4985C8.59526 8.8297 8.32646 9.0985 7.99526 9.0985Z"
                fill="#F8F8F8"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.00322 11.8368C7.56082 11.8368 7.19922 11.4792 7.19922 11.0368C7.19922 10.5944 7.55362 10.2368 7.99522 10.2368H8.00322C8.44562 10.2368 8.80322 10.5944 8.80322 11.0368C8.80322 11.4792 8.44562 11.8368 8.00322 11.8368Z"
                fill="#F8F8F8"
              />
            </svg>
          </div>
        </div>
        <p>Get it before it’s gone. Offer ends Dec 31, 2022</p>
        <button>Get 3 months for $2.99</button>
      </div>
    </>
  );
};

export default Advertisement;