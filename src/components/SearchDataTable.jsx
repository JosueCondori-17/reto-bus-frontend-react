import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

const SearchDataTable = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    const getHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                <i className="pi pi-search" style={{ position: "absolute", marginRight: "25px" }}></i>
                <InputText
                    style={{ textAlign: 'left', padding: "5px", marginLeft: "10px" }}
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Buscar..."
                />
            </div>
        );
    };

    return {
        filter: globalFilter,
        header: getHeader(),
    };
};

export default SearchDataTable;
