import React from 'react';


function SettingsPanel({ node, onLabelChange, onBack }) {
    return (
        <div className="settings-panel">

            <div className="settings-panel__header">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <h3>Message</h3>
            </div>

            <div className="settings-panel__divider" />


            <div className="settings-panel__field">
                <label className="field-label">Text</label>
                <textarea
                    className="field-textarea"
                    value={node.data.label}
                    onChange={(e) => onLabelChange(e.target.value)}
                    rows={4}
                    placeholder="Enter your message..."
                    autoFocus
                />
            </div>
        </div>
    );
}

export default SettingsPanel;