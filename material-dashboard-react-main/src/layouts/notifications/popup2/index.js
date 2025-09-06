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

import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Popup2({ open, onClose, children, ...rest }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    if (onClose) onClose();
  };

  // open prop이 전달되면 해당 값 사용, 아니면 내부 상태 사용
  const isOpen = open !== undefined ? open : modalOpen;

  return (
    <>
      {/* 외부에서 제어되지 않을 때만 버튼 표시 */}
      {open === undefined && (
        <MDButton variant="gradient" color="primary" onClick={openModal} {...rest}>
          {children}
        </MDButton>
      )}

      {/* Modal Popup */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <DialogTitle>
          <MDBox display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              팝업 2
            </MDTypography>
            <IconButton
              aria-label="close"
              onClick={closeModal}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              ✕
            </IconButton>
          </MDBox>
        </DialogTitle>

        <DialogContent>
          <MDBox py={2}>
            <MDTypography variant="body1" color="text" mb={2}>
              이것은 두 번째 팝업입니다.
            </MDTypography>
            <MDTypography variant="body2" color="text" mb={2}>
              팝업1에서 이 팝업을 호출했을 때 팝업1이 자동으로 닫혔습니다.
            </MDTypography>
            <MDBox
              p={2}
              sx={{
                backgroundColor: "success.light",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "success.main",
              }}
            >
              <MDTypography variant="body2" color="success.dark">
                ✅ 팝업 연동이 성공적으로 작동했습니다!
              </MDTypography>
            </MDBox>
          </MDBox>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <MDButton variant="outlined" color="secondary" onClick={closeModal} sx={{ mr: 1 }}>
            닫기
          </MDButton>
          <MDButton
            variant="gradient"
            color="success"
            onClick={() => {
              closeModal();
              // 성공 알림을 표시하는 로직을 여기에 추가할 수 있습니다
            }}
          >
            완료
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Setting default values for the props of Popup2
Popup2.defaultProps = {
  open: false,
  onClose: () => {},
  children: null,
};

// Typechecking props for the Popup2
Popup2.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Popup2;
