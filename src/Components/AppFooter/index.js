import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      
      <Typography.Link
        className="footer-link"
        href="https://www.google.com"
        target={"_blank"}
      >
        L-M Dashboard
      </Typography.Link>
      <Typography.Link className="footer-link" href="tel:+123456789">
        +123456789
      </Typography.Link>
      <Typography.Link
        className="footer-link"
        href="https://www.google.com"
        target={"_blank"}
      >
        186 Nguyen Huu Tho
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
