'use client';
import { useState } from 'react';
import './FileExplorer.css';

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState(['This PC', 'Desktop']);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'details' | 'icons'>('details');

  const quickAccess = [
    { name: 'Desktop', icon: '📁', type: 'folder', items: '15 items' },
    { name: 'Downloads', icon: '📁', type: 'folder', items: '128 items' },
    { name: 'Documents', icon: '📁', type: 'folder', items: '47 items' },
    { name: 'Pictures', icon: '📁', type: 'folder', items: '234 items' },
  ];

  const folders = [
    { name: '3D Objects', icon: '📁', type: 'folder', date: '10/15/2023', size: '-' },
    { name: 'Desktop', icon: '📁', type: 'folder', date: 'Today', size: '-' },
    { name: 'Documents', icon: '📁', type: 'folder', date: 'Yesterday', size: '-' },
    { name: 'Downloads', icon: '📁', type: 'folder', date: 'Today', size: '-' },
    { name: 'Music', icon: '📁', type: 'folder', date: '10/12/2023', size: '-' },
    { name: 'Pictures', icon: '📁', type: 'folder', date: 'Yesterday', size: '-' },
    { name: 'Videos', icon: '📁', type: 'folder', date: '10/10/2023', size: '-' },
  ];

  const files = [
    { name: 'Document.docx', icon: '📄', type: 'file', date: 'Today', size: '15.2 KB' },
    { name: 'Budget.xlsx', icon: '📊', type: 'file', date: 'Yesterday', size: '24.8 KB' },
    { name: 'Presentation.pptx', icon: '📽️', type: 'file', date: '2 days ago', size: '1.2 MB' },
    { name: 'Photo.jpg', icon: '🖼️', type: 'file', date: '3 days ago', size: '4.5 MB' },
    { name: 'Notes.txt', icon: '📝', type: 'file', date: 'Today', size: '2.1 KB' },
  ];

  const drives = [
    { name: 'Windows (C:)', icon: '💽', type: 'drive', free: '125 GB free of 237 GB' },
    { name: 'Data (D:)', icon: '💽', type: 'drive', free: '458 GB free of 931 GB' },
  ];

  const navigateTo = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
    setSelectedFile(null);
  };

  const navigateBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
  };

  const handleFileDoubleClick = (fileName: string) => {
    const item = [...folders, ...files].find(item => item.name === fileName);
    if (item?.type === 'folder') {
      navigateTo(fileName);
    } else {
      alert(`Opening: ${fileName}`);
    }
  };

  return (
    <div className="file-explorer">
      {/* Title Bar */}
      <div className="explorer-title-bar">
        <div className="title-bar-left">
          <button className="title-bar-button" onClick={navigateBack}>←</button>
          <button className="title-bar-button" onClick={navigateUp}>→</button>
          <div className="path-display">{currentPath.join(' › ')}</div>
        </div>
        <div className="title-bar-right">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>
      </div>

      {/* Command Bar */}
      <div className="command-bar">
        <div className="command-group">
          <button className="command-button">
            <span className="command-icon">⎘</span>
            <span>Copy</span>
          </button>
          <button className="command-button">
            <span className="command-icon">✂️</span>
            <span>Paste</span>
          </button>
          <button className="command-button">
            <span className="command-icon">📁</span>
            <span>New folder</span>
          </button>
        </div>
        <div className="command-group">
          <button className="command-button" onClick={() => setViewMode('icons')}>
            <span className="command-icon">◼️◼️</span>
            <span>View</span>
          </button>
          <button className="command-button" onClick={() => setViewMode('details')}>
            <span className="command-icon">≡</span>
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="explorer-main">
        {/* Navigation Pane */}
        <div className="navigation-pane">
          <div className="nav-section">
            <div className="nav-header">Quick access</div>
            {quickAccess.map((item) => (
              <div
                key={item.name}
                className={`nav-item ${currentPath.includes(item.name) ? 'active' : ''}`}
                onClick={() => navigateTo(item.name)}
              >
                <span className="nav-icon">{item.icon}</span>
                <div className="nav-item-info">
                  <span className="nav-item-name">{item.name}</span>
                  <span className="nav-item-desc">{item.items}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="nav-section">
            <div className="nav-header">OneDrive</div>
            <div className="nav-item">
              <span className="nav-icon">☁️</span>
              <div className="nav-item-info">
                <span className="nav-item-name">Personal</span>
                <span className="nav-item-desc">12.4 GB used</span>
              </div>
            </div>
          </div>
          
          <div className="nav-section">
            <div className="nav-header">This PC</div>
            {drives.map((drive) => (
              <div key={drive.name} className="nav-item">
                <span className="nav-icon">{drive.icon}</span>
                <div className="nav-item-info">
                  <span className="nav-item-name">{drive.name}</span>
                  <span className="nav-item-desc">{drive.free}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="nav-section">
            <div className="nav-header">Network</div>
            <div className="nav-item">
              <span className="nav-icon">🌐</span>
              <span className="nav-item-name">Network</span>
            </div>
          </div>
        </div>

        {/* File Area */}
        <div className="file-area">
          {/* Address Bar */}
          <div className="address-bar">
            <div className="address-path">
              {currentPath.map((segment, index) => (
                <span key={index} className="address-segment">
                  {segment}
                  {index < currentPath.length - 1 && <span className="address-arrow">›</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Files Grid */}
          <div className={`files-grid ${viewMode}`}>
            {viewMode === 'details' ? (
              <>
                {/* Details View Header */}
                <div className="details-header">
                  <div className="detail-column name-column">Name</div>
                  <div className="detail-column date-column">Date modified</div>
                  <div className="detail-column type-column">Type</div>
                  <div className="detail-column size-column">Size</div>
                </div>

                {/* Files List */}
                <div className="files-list">
                  {[...folders, ...files].map((item) => (
                    <div
                      key={item.name}
                      className={`file-item ${selectedFile === item.name ? 'selected' : ''}`}
                      onClick={() => handleFileClick(item.name)}
                      onDoubleClick={() => handleFileDoubleClick(item.name)}
                    >
                      <div className="file-icon">{item.icon}</div>
                      <div className="file-name">{item.name}</div>
                      <div className="file-date">{item.date}</div>
                      <div className="file-type">
                        {item.type === 'folder' ? 'File folder' : 
                         item.name.endsWith('.docx') ? 'Microsoft Word Document' :
                         item.name.endsWith('.xlsx') ? 'Microsoft Excel Worksheet' :
                         item.name.endsWith('.pptx') ? 'Microsoft PowerPoint Presentation' :
                         item.name.endsWith('.jpg') ? 'JPEG Image' : 'Text Document'}
                      </div>
                      <div className="file-size">{item.size}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Icons View */
              <div className="icons-view">
                {[...folders, ...files].map((item) => (
                  <div
                    key={item.name}
                    className={`file-icon-item ${selectedFile === item.name ? 'selected' : ''}`}
                    onClick={() => handleFileClick(item.name)}
                    onDoubleClick={() => handleFileDoubleClick(item.name)}
                  >
                    <div className="file-icon-large">{item.icon}</div>
                    <div className="file-icon-name">{item.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details Pane */}
        <div className="details-pane">
          <div className="pane-header">Details</div>
          {selectedFile ? (
            <div className="file-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedFile}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">
                  {selectedFile.endsWith('.docx') ? 'Microsoft Word Document' :
                   selectedFile.endsWith('.xlsx') ? 'Microsoft Excel Worksheet' :
                   selectedFile.endsWith('.pptx') ? 'Microsoft PowerPoint Presentation' :
                   selectedFile.endsWith('.jpg') ? 'JPEG Image' :
                   selectedFile.endsWith('.txt') ? 'Text Document' : 'File folder'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date modified:</span>
                <span className="detail-value">
                  {[...folders, ...files].find(f => f.name === selectedFile)?.date}
                </span>
              </div>
              {[...files].find(f => f.name === selectedFile) && (
                <div className="detail-row">
                  <span className="detail-label">Size:</span>
                  <span className="detail-value">
                    {[...files].find(f => f.name === selectedFile)?.size}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <div className="no-selection-icon">📄</div>
              <p>Select a file to view its details</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          {selectedFile ? '1 item selected' : `${folders.length + files.length} items`}
        </div>
        <div className="status-right">
          {selectedFile && [...files].find(f => f.name === selectedFile) && 
            `Size: ${[...files].find(f => f.name === selectedFile)?.size}`}
        </div>
      </div>
    </div>
  );
}