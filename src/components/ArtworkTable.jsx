import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
//import { fetchArtworks } from "../services/api";
import SelectionOverlay from "./SelectionOverlay";
import { fetchArtworks } from "../services/api.js";
import "../App.css";

function ArtworkTable() {
  const [artworks, setArtworks] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const rows = 10;

  // Persistent selection (IDs only)
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    loadData(page + 1);
  }, [page]);

  const loadData = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await fetchArtworks(pageNumber, rows);
      setArtworks(res.data || []);
      setTotalRecords(res.total || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Selection for current page only
  const currentPageSelection = artworks.filter((item) =>
    selectedIds.has(item.id)
  );

  const onSelectionChange = (e) => {
    const updated = new Set(selectedIds);

    const selectedRows = e.value || [];

    // Add selected rows
    selectedRows.forEach((row) => updated.add(row.id));

    // Remove deselected rows from current page
    artworks.forEach((row) => {
      if (!selectedRows.find((r) => r.id === row.id)) {
        updated.delete(row.id);
      }
    });

    setSelectedIds(updated);
  };

  // Custom select (current page only, no prefetching)
  const handleCustomSelect = (count) => {
    const updated = new Set(selectedIds);

    const available = artworks.filter((a) => !updated.has(a.id));
    const toSelect = available.slice(0, count);

    toSelect.forEach((a) => updated.add(a.id));

    setSelectedIds(updated);
    setOverlayVisible(false);
  };

  return (
    <div className="card">
      <Button
  label="Custom Select"
  icon="pi pi-plus"
  severity="primary"
  className="p-mb-3"
  onClick={() => setOverlayVisible(true)}
/>

      <DataTable
        value={artworks}
        paginator
        lazy
        rows={rows}
        totalRecords={totalRecords}
        first={page * rows}
        onPage={(e) => setPage(e.page)}
        loading={loading}
        selection={currentPageSelection}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        emptyMessage="No data found"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>

      <SelectionOverlay
        visible={overlayVisible}
        onHide={() => setOverlayVisible(false)}
        onSelect={handleCustomSelect}
      />
    </div>
  );
}

export default ArtworkTable;