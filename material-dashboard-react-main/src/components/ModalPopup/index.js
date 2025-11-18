import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ModalPopup({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth,
  fullWidth,
  showClose,
  PaperProps,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: { borderRadius: 2, boxShadow: 3 },
        ...PaperProps,
      }}
    >
      {(title || showClose) && (
        <DialogTitle>
          <MDBox display="flex" justifyContent="space-between" alignItems="center">
            {title && (
              <MDTypography variant="h6" fontWeight="medium">
                {title}
              </MDTypography>
            )}
            {showClose && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ color: (theme) => theme.palette.grey[500] }}
              >
                ✕
              </IconButton>
            )}
          </MDBox>
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>

      {actions && <DialogActions sx={{ p: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
}

ModalPopup.defaultProps = {
  onClose: () => {},
  title: "",
  actions: null,
  maxWidth: "sm",
  fullWidth: true,
  showClose: true,
  PaperProps: {},
};

ModalPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]),
  fullWidth: PropTypes.bool,
  showClose: PropTypes.bool,
  PaperProps: PropTypes.object,
};

export default ModalPopup;
