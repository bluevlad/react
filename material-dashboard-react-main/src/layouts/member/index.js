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

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// API
import { fetchMemberListData } from "api/member";

function Member() {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);

  useEffect(() => {
    const loadMemberData = async () => {
      setLoading(true);
      try {
        const data = await fetchMemberListData(currentPage);
        setMemberList(data.memberList || []);
        setPaginationInfo(data.paginationInfo || null);
        setTotalPages(data.paginationInfo?.totalPageCount || 1);
      } catch (error) {
        console.error("Failed to load member data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMemberData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const columns = [
    { Header: "회원ID", accessor: "userId", width: "15%", align: "left" },
    { Header: "회원명", accessor: "userName", width: "15%", align: "left" },
    { Header: "이메일", accessor: "email", width: "20%", align: "left" },
    { Header: "성별", accessor: "sex", align: "center" },
    { Header: "생년월일", accessor: "birthDay", align: "center" },
    { Header: "역할", accessor: "userRole", align: "center" },
    { Header: "상태", accessor: "status", align: "center" },
    { Header: "등록일", accessor: "regDt", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = memberList.map((member) => ({
    userId: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {member.userId}
      </MDTypography>
    ),
    userName: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {member.userName}
      </MDTypography>
    ),
    email: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {member.email}
      </MDTypography>
    ),
    sex: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {member.sex === "M" ? "남성" : member.sex === "F" ? "여성" : "-"}
      </MDTypography>
    ),
    birthDay: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {member.birthDay}
      </MDTypography>
    ),
    userRole: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {member.userRole}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={member.isUse === "Y" ? "활성" : "비활성"}
          color={member.isUse === "Y" ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    regDt: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {member.regDt ? new Date(member.regDt).toLocaleDateString("ko-KR") : "-"}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        Edit
      </MDTypography>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  회원 목록
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox p={3} textAlign="center">
                    <MDTypography variant="caption">로딩 중...</MDTypography>
                  </MDBox>
                ) : (
                  <>
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                    {paginationInfo && (
                      <MDBox
                        p={3}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <MDBox>
                          <MDTypography variant="caption" color="text">
                            전체 {paginationInfo.totalRecordCount}건 중{" "}
                            {paginationInfo.firstRecordIndex + 1} -{" "}
                            {Math.min(
                              paginationInfo.lastRecordIndex + 1,
                              paginationInfo.totalRecordCount
                            )}
                            건 표시{" "}
                          </MDTypography>
                        </MDBox>
                        <Stack spacing={2}>
                          <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                          />
                        </Stack>
                      </MDBox>
                    )}
                  </>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Member;
