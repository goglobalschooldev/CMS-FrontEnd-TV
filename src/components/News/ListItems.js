import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlipMove from 'react-flip-move';
import { Box, TextField } from '@mui/system';
import Card from '@mui/material/Card';
import { Input, Typography, Stack, CardHeader, CardContent } from '@mui/material';

function ListItems(props) {
    const items = props.items;
    const listItems = items.map(item => {

        if (item.check !== "Image") {
            return <Card className="list" key={item.key} sx={{ width: 460, mt: 2, }}>
                <CardHeader
                    title={`${item.check}`}
                />
                <CardContent>
                    <Stack direction="row" spacing={1} >
                        <Input
                            multiline
                            sx={{ width: "90%" }}
                            type="text"
                            id={item.key}
                            value={item.text}
                            onChange={(e) => {
                                props.setUpdate(e.target.value, item.key)
                            }}
                        />

                        <Typography sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", color: "red" }}>
                            <DeleteOutlineIcon onClick={() => {
                                props.deleteItem(item.key)
                            }} icon="trash" />
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        } else {
            return <Card className="list" key={item.key} sx={{ width: 460, mt: 2, }}>
                <CardHeader
                    title={`${item.check}`}
                />
                <CardContent>
                    <Stack direction="row" spacing={1} >
                        <Input
                            sx={{ width: "90%" }}
                            type="file"
                            id={item.key}
                            // value={item.text}
                            onChange={(e) => {
                                props.setUpdate(e.target.value, item.key)
                                console.log(e.target.value)
                            }}
                        />

                        <Typography sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", color: "red" }}>
                            <DeleteOutlineIcon onClick={() => {
                                props.deleteItem(item.key)
                            }} icon="trash" />
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        }

    })
    return (
        <>

            <FlipMove duration={300} easing="ease-in-out">
                {listItems}
            </FlipMove>


        </>
    );
}

export default ListItems;