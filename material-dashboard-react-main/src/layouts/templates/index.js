import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Templates() {
  // 초기 카테고리 데이터
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "프로젝트 관리",
      content: "<h3>프로젝트 관리</h3><p>프로젝트 관리에 대한 템플릿입니다.</p>",
      children: [
        {
          id: "1-1",
          name: "프로젝트 계획서",
          content: "<h4>프로젝트 계획서</h4><p>프로젝트 계획서 작성 템플릿입니다.</p>",
          children: [],
        },
        {
          id: "1-2",
          name: "프로젝트 보고서",
          content: "<h4>프로젝트 보고서</h4><p>프로젝트 보고서 작성 템플릿입니다.</p>",
          children: [],
        },
      ],
    },
    {
      id: "2",
      name: "문서 템플릿",
      content: "<h3>문서 템플릿</h3><p>각종 문서 템플릿 모음입니다.</p>",
      children: [
        {
          id: "2-1",
          name: "회의록",
          content: "<h4>회의록</h4><p>회의록 작성 템플릿입니다.</p>",
          children: [],
        },
        {
          id: "2-2",
          name: "제안서",
          content: "<h4>제안서</h4><p>제안서 작성 템플릿입니다.</p>",
          children: [
            {
              id: "2-2-1",
              name: "기술 제안서",
              content: "<h5>기술 제안서</h5><p>기술 제안서 세부 템플릿입니다.</p>",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "개발 문서",
      content: "<h3>개발 문서</h3><p>개발 관련 문서 템플릿입니다.</p>",
      children: [
        {
          id: "3-1",
          name: "API 문서",
          content: "<h4>API 문서</h4><p>API 문서 작성 템플릿입니다.</p>",
          children: [],
        },
        {
          id: "3-2",
          name: "설계 문서",
          content: "<h4>설계 문서</h4><p>시스템 설계 문서 템플릿입니다.</p>",
          children: [],
        },
      ],
    },
  ]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [parentIdForNew, setParentIdForNew] = useState(null);

  // 노드 찾기 함수
  const findNodeById = (nodes, id) => {
    for (let node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // 노드 선택 핸들러
  const handleNodeSelect = (event, nodeId) => {
    const node = findNodeById(categories, nodeId);
    if (node) {
      setSelectedNode(node);
      setEditorContent(node.content || "");
      setIsEditing(false);
    }
  };

  // 편집 모드 토글
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // 내용 저장
  const handleSaveContent = () => {
    if (selectedNode) {
      const updateNodeContent = (nodes) => {
        return nodes.map((node) => {
          if (node.id === selectedNode.id) {
            return { ...node, content: editorContent };
          }
          if (node.children) {
            return { ...node, children: updateNodeContent(node.children) };
          }
          return node;
        });
      };

      setCategories(updateNodeContent(categories));
      setSelectedNode({ ...selectedNode, content: editorContent });
      setIsEditing(false);
    }
  };

  // 새 카테고리 추가 다이얼로그 열기
  const handleAddCategory = (parentId = null) => {
    setParentIdForNew(parentId);
    setNewCategoryName("");
    setShowAddDialog(true);
  };

  // 새 카테고리 생성
  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;

    const newId = Date.now().toString();
    const newCategory = {
      id: newId,
      name: newCategoryName,
      content: `<h3>${newCategoryName}</h3><p>새로운 카테고리입니다.</p>`,
      children: [],
    };

    if (parentIdForNew) {
      // 하위 카테고리로 추가
      const addToParent = (nodes) => {
        return nodes.map((node) => {
          if (node.id === parentIdForNew) {
            return {
              ...node,
              children: [...node.children, newCategory],
            };
          }
          if (node.children) {
            return { ...node, children: addToParent(node.children) };
          }
          return node;
        });
      };
      setCategories(addToParent(categories));
    } else {
      // 최상위 카테고리로 추가
      setCategories([...categories, newCategory]);
    }

    setShowAddDialog(false);
    setNewCategoryName("");
  };

  // 카테고리 삭제
  const handleDeleteCategory = (nodeId) => {
    if (window.confirm("이 카테고리와 하위 카테고리를 모두 삭제하시겠습니까?")) {
      const deleteNode = (nodes) => {
        return nodes.filter((node) => {
          if (node.id === nodeId) return false;
          if (node.children) {
            node.children = deleteNode(node.children);
          }
          return true;
        });
      };

      setCategories(deleteNode(categories));
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
        setEditorContent("");
      }
    }
  };

  // 트리 아이템 렌더링
  const renderTree = (nodes) =>
    nodes.map((node) => (
      <TreeItem
        key={node.id}
        nodeId={node.id}
        label={
          <MDBox display="flex" alignItems="center" justifyContent="space-between" py={0.5}>
            <MDTypography variant="button" fontWeight="regular">
              {node.name}
            </MDTypography>
            <MDBox display="flex" gap={0.5}>
              <Tooltip title="하위 카테고리 추가">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddCategory(node.id);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="삭제">
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(node.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </MDBox>
          </MDBox>
        }
      >
        {Array.isArray(node.children) ? renderTree(node.children) : null}
      </TreeItem>
    ));

  // Quill 에디터 모듈 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          {/* 왼쪽: 트리 구조 */}
          <Grid item xs={12} md={4} lg={3}>
            <Card>
              <MDBox
                p={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="1px solid"
                borderColor="grey.300"
              >
                <MDTypography variant="h6" fontWeight="medium">
                  카테고리 관리
                </MDTypography>
                <Tooltip title="최상위 카테고리 추가">
                  <IconButton color="info" onClick={() => handleAddCategory(null)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </MDBox>

              <MDBox p={2} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}>
                <TreeView
                  aria-label="category navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  onNodeSelect={handleNodeSelect}
                  sx={{ flexGrow: 1, overflowY: "auto" }}
                >
                  {renderTree(categories)}
                </TreeView>
              </MDBox>
            </Card>
          </Grid>

          {/* 오른쪽: 상세 내용 에디터 */}
          <Grid item xs={12} md={8} lg={9}>
            <Card>
              <MDBox
                p={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="1px solid"
                borderColor="grey.300"
              >
                <MDBox>
                  <MDTypography variant="h6" fontWeight="medium">
                    {selectedNode ? selectedNode.name : "카테고리를 선택하세요"}
                  </MDTypography>
                  {selectedNode && (
                    <MDTypography variant="caption" color="text">
                      ID: {selectedNode.id}
                    </MDTypography>
                  )}
                </MDBox>

                {selectedNode && (
                  <MDBox display="flex" gap={1}>
                    {!isEditing ? (
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={handleEditToggle}
                      >
                        편집
                      </MDButton>
                    ) : (
                      <>
                        <MDButton
                          variant="gradient"
                          color="success"
                          size="small"
                          startIcon={<SaveIcon />}
                          onClick={handleSaveContent}
                        >
                          저장
                        </MDButton>
                        <MDButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={handleEditToggle}
                        >
                          취소
                        </MDButton>
                      </>
                    )}
                  </MDBox>
                )}
              </MDBox>

              <MDBox p={3}>
                {selectedNode ? (
                  isEditing ? (
                    <MDBox>
                      <ReactQuill
                        theme="snow"
                        value={editorContent}
                        onChange={setEditorContent}
                        modules={modules}
                        formats={formats}
                        style={{ height: "500px", marginBottom: "50px" }}
                      />
                    </MDBox>
                  ) : (
                    <MDBox
                      sx={{
                        minHeight: "500px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: selectedNode.content }} />
                    </MDBox>
                  )
                ) : (
                  <MDBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="500px"
                  >
                    <Icon fontSize="large" color="disabled" sx={{ fontSize: "80px", mb: 2 }}>
                      category
                    </Icon>
                    <MDTypography variant="h5" color="text" mb={1}>
                      카테고리를 선택하세요
                    </MDTypography>
                    <MDTypography variant="body2" color="text" textAlign="center">
                      왼쪽 트리에서 카테고리를 선택하면
                      <br />
                      해당 카테고리의 내용을 확인하고 편집할 수 있습니다.
                    </MDTypography>
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* 새 카테고리 추가 다이얼로그 */}
        {showAddDialog && (
          <MDBox
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={() => setShowAddDialog(false)}
          >
            <Card sx={{ width: "500px", maxWidth: "90%" }} onClick={(e) => e.stopPropagation()}>
              <MDBox p={3}>
                <MDTypography variant="h5" mb={3}>
                  새 카테고리 추가
                </MDTypography>

                <TextField
                  fullWidth
                  label="카테고리 이름"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateCategory();
                    }
                  }}
                  autoFocus
                  sx={{ mb: 3 }}
                />

                <MDBox display="flex" justifyContent="flex-end" gap={1}>
                  <MDButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowAddDialog(false)}
                  >
                    취소
                  </MDButton>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={handleCreateCategory}
                    disabled={!newCategoryName.trim()}
                  >
                    추가
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Templates;
