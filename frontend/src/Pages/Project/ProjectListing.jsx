import React, { useState, useEffect } from 'react';
import { Container, Typography, Toolbar, Link, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteModal from '../../Components/Common/DeleteModal';
import { DeleteMultipleProject, DeleteProject, GetAllProject } from '../../Services/ProjectService';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

function ProjectListing() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [multipleOpen, setMultipleOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemList, setSelectedItemList] = useState([]);

    const loadItems = () => {
        try {
            GetAllProject()
                .then((res) => {
                    setItems(res.data);
                })
                .catch((err) => {
                    toast.error('Internal server error occurred');
                })
        } catch (error) {
            console.error('Error fetching Projects:', error);
        }
    };

    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMultipleClose = () => {
        setMultipleOpen(false);
    };

    const handleDelete = async () => {
        DeleteProject(selectedItem.id)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`Deletion "${res.data.title}" successful`);
                    loadItems();
                }
            })
            .catch((err) => {
                toast.error(err)
            });
        handleClose();
    };

    const handleDeleteMultiple = async () => {
        DeleteMultipleProject(selectedItemList)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`Deletion of selected Items successful`);
                    loadItems();
                }
            })
            .catch((err) => {
                toast.error(err)
            });
        handleMultipleClose();
    };

    const handleDeleteMultipleConfirmation = () => {
        if (selectedItemList.length === 0) {
            toast.warning("No Experiences Selected To Delete");
            return;
        }
        setMultipleOpen(true);
    }

    useEffect(() => {
        loadItems();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Toolbar>
                    <Link component={RouterLink} to={`/project/edit/${params.row.id}`} color="primary" underline="none" sx={{ mr: 3 }}>
                        <EditIcon />
                    </Link>
                    <Link component="button" color="error" underline="none" onClick={() => handleOpen(params.row)}>
                        <DeleteIcon />
                    </Link>
                </Toolbar>
            ),
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                <AccountTreeIcon color="primary" sx={{ fontSize: 40, marginRight: 1 }} />
                Project Listing
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate("/project/create")}
                sx={{ mb: 3 }}
            >
                Create
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleDeleteMultipleConfirmation}
                sx={{ mb: 3, ml: 2 }}
            >
                Delete
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setSelectedItemList(newRowSelectionModel);
                    }}
                />
            </div>
            <DeleteModal
                open={open}
                handleClose={handleClose}
                handleDelete={handleDelete}
                selectedItem={selectedItem}
            />
            <DeleteModal
                open={multipleOpen}
                handleClose={handleMultipleClose}
                handleDelete={handleDeleteMultiple}
                selectedItemList={selectedItemList}
            />
        </Container>
    );
}

export default ProjectListing;
