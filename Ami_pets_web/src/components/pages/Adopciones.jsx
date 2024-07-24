import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Url } from "../../../Url";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../NextUi/ChevronDownIcon";
import { PlusIcon } from "../NextUi/PlusIcon";
import { capitalize } from "../NextUi/Utils";
import { VerticalDotsIcon } from "../NextUi/VerticalDotsIcon";
import { SearchIcon } from "../NextUi/SearchIcon";

const statusOptions = [
  { uid: "aceptada", name: "aceptada" },
  { uid: "pendiente", name: "pendiente" },
  { uid: "rechazada", name: "rechazada" },
];

const columns = [
  { uid: "id", name: "ID" },
  { uid: "fecha_adopcion", name: "Fecha de Adopción", sortable: true },
  { uid: "nombre_usuario", name: "Nombre Usuario" },
  { uid: "nombre_mascota", name: "Nombre Mascota" },
  { uid: "estado", name: "Estado" },
  { uid: "actions", name: "Actions" },
];

const statusColorMap = {
  aceptada: "success",
  pendiente: "warning",
  rechazada: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "fecha_adopcion", "nombre_usuario", "nombre_mascota", "estado", "actions"];

export default function App() {
  const [adopciones, setAdopciones] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "fecha_adopcion",
    direction: "ascending",
  });

  useEffect(() => {
    const obtenerAdopciones = async () => {
      try {
        const response = await axios.get(`${Url}/adopciones/listar`);
        setAdopciones(response.data);
      } catch (error) {
        console.error("Error al obtener las adopciones:", error);
      }
    };
    obtenerAdopciones();
  }, []);

  const pages = Math.ceil(adopciones.length / rowsPerPage);

  const filteredItems = useMemo(() => {
    let filteredAdopciones = [...adopciones];
    if (filterValue) {
      filteredAdopciones = filteredAdopciones.filter((item) =>
        item.fecha_adopcion.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.nombre_usuario.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.nombre_mascota.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filteredAdopciones = filteredAdopciones.filter((item) =>
        Array.from(statusFilter).includes(item.estado)
      );
    }
    return filteredAdopciones;
  }, [adopciones, filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "estado":
        return (
          <Chip className={`capitalize ${item.estado === 'aceptada' && "bg-green-800"}`} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={ <PlusIcon /> }>
              Añadir Nuevo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {adopciones.length} adopciones</span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, visibleColumns, adopciones.length, onSearchChange]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {adopciones.length} adopciones encontradas
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => setPage(page - 1)}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => setPage(page + 1)}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [adopciones.length, page, pages]);

  return (
    <>
    <div className="p-20 px-44">
      <Table
        aria-label="Tabla de adopciones con paginación"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            isHidden={!visibleColumns.has(column.uid)}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No hay adopciones para mostrar"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
          </>
  );
}
