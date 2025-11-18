import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const LoadingPassList = ["/document"];

const Loading = ({ loading, ...props }) => {
  const locationPathname = document.location.pathname;
  const spinningLoading = LoadingPassList.includes(locationPathname) ? false : loading;
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
        />
      }
      spinning={spinningLoading}
      {...props}
    />
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
