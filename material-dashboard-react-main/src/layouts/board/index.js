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
import Icon from "@mui/material/Icon";

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
import { fetchBoardData } from "api/board";

function Board() {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);

  useEffect(() => {
    const loadBoardData = async () => {
      setLoading(true);
      try {
        const data = await fetchBoardData(currentPage);
        setBoardList(data.boardList || []);
        setPaginationInfo(data.paginationInfo || null);
        setTotalPages(data.paginationInfo?.totalPageCount || 1);
      } catch (error) {
        console.error("Failed to load board data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBoardData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const columns = [
    { Header: "게시판구분", accessor: "boardMngSeq", width: "15%", align: "left" },
    { Header: "게시판번호", accessor: "boardSeq", width: "15%", align: "left" },
    { Header: "게시판제목", accessor: "subject", width: "15%", align: "left" },
    { Header: "공지여부", accessor: "noticeTopYn", width: "20%", align: "left" },
    { Header: "공개여부", accessor: "openYn", align: "center" },
    { Header: "사용여부", accessor: "isUse", align: "center" },
    { Header: "열람수", accessor: "hits", align: "center" },
    { Header: "등록일", accessor: "regDt", align: "center" },
    { Header: "등록자", accessor: "regId", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = boardList.map((board) => ({
    boardMngSeq: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {board.boardMngSeq}
      </MDTypography>
    ),
    boardSeq: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {board.boardSeq}
      </MDTypography>
    ),
    subject: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {board.subject}
      </MDTypography>
    ),
    noticeTopYn: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {board.noticeTopYn === "Y" ? "공지" : "일반"}
      </MDTypography>
    ),
    openYn: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {board.openYn === "Y" ? "공개" : "비공개"}
      </MDTypography>
    ),
    isUse: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {board.isUse === "Y" ? "사용" : "비사용"}
      </MDTypography>
    ),
    hits: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {board.hits}
      </MDTypography>
    ),
    regDt: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {board.regDt ? new Date(board.regDt).toLocaleDateString("ko-KR") : "-"}
      </MDTypography>
    ),
    regId: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {board.regId}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" href="#" color="text">
        <Icon>more_vert</Icon>
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
                  게시판 목록
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

export default Board;
