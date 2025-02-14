/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "강의구분", accessor: "lecture", width: "30%", align: "left" },
      { Header: "강의료", accessor: "price", align: "left" },
      { Header: "수강여부", accessor: "status", align: "center" },
      { Header: "진도율", accessor: "progress", align: "center" },
      { Header: "관리", accessor: "action", align: "center" },
    ],

    rows: [
      {
        lecture: <Project image={LogoAsana} name="Asana" />,
        price: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            55,000원
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            수강중
          </MDTypography>
        ),
        progress: <Progress color="info" value={60} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        lecture: <Project image={logoGithub} name="Github" />,
        price: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            60,000원
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            수강완료
          </MDTypography>
        ),
        progress: <Progress color="success" value={100} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        lecture: <Project image={logoAtlassian} name="Atlassian" />,
        price: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            45,000원
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            수강취소
          </MDTypography>
        ),
        progress: <Progress color="error" value={30} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        lecture: <Project image={logoSpotify} name="Spotify" />,
        price: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            75,000원
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            수강중
          </MDTypography>
        ),
        progress: <Progress color="info" value={80} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        lecture: <Project image={logoSlack} name="Slack" />,
        price: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            50,000원
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            수강취소
          </MDTypography>
        ),
        progress: <Progress color="error" value={20} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        lecture: <Project image={logoInvesion} name="Invesion" />,
        price: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            55,000원
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            수강완료
          </MDTypography>
        ),
        progress: <Progress color="success" value={90} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
