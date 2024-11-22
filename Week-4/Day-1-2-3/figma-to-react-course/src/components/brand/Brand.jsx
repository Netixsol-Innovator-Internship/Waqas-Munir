import "./brand.css";
import google from "../../assets/google.png";
import slack from "../../assets/slack.png";
import atlasian from "../../assets/atlassian.png";
import dropbox from "../../assets/dropbox.png";
import shopify from "../../assets/shopify.png";

export default function Brand() {
  return (
    <div className="gpt3__brand section__padding">
      <div>
        <img src={google} alt="google" />
      </div>
      <div>
        <img src={slack} alt="Slack" />
      </div>
      <div>
        <img src={atlasian} alt="atlassian" />
      </div>
      <div>
        <img src={dropbox} alt="dropbox" />
      </div>
      <div>
        <img src={shopify} alt="shopify" />
      </div>
    </div>
  );
}
