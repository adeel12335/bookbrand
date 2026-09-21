import React from 'react';

export function CompareTable({ table }) {
  if (!table?.rows?.length) return null;
  const columns = table.columns || [];
  return (
    <div className="br_compare_wrap">
      {table.caption ? <p className="br_compare_caption">{table.caption}</p> : null}
      <div className="br_compare_scroll">
        <table className="br_compare">
          {columns.length ? (
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column} scope="col">{column}</th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {table.rows.map((row, index) => (
              <tr key={row[0] || index}>
                {row.map((cell, cellIndex) => (
                  cellIndex === 0
                    ? <th key={cellIndex} scope="row">{cell}</th>
                    : <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function QuickAnswer({ text }) {
  if (!text) return null;
  return (
    <div className="br_quick" data-speakable="1">
      <p className="br_quick_label">Quick answer</p>
      <p>{text}</p>
    </div>
  );
}

export function EditSample({ sample }) {
  if (!sample?.before || !sample?.after) return null;
  return (
    <div className="br_edit_sample">
      <figure>
        <figcaption>Before</figcaption>
        <p>{sample.before}</p>
      </figure>
      <figure>
        <figcaption>After</figcaption>
        <p>{sample.after}</p>
      </figure>
    </div>
  );
}
