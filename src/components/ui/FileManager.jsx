import React from 'react';
import { Download, Trash2, File, Image as ImageIcon, FileText, Archive } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';

const FileManager = ({ files = [], onDownload, onDelete, readOnly = false }) => {
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.includes('pdf')) return FileText;
    if (type.includes('word') || type.includes('document')) return FileText;
    if (type.includes('zip') || type.includes('rar')) return Archive;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = (file) => {
    if (file.url) {
      // If URL exists, download from URL
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
    } else if (file.file) {
      // If File object exists, download from blob
      const url = URL.createObjectURL(file.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
    }
    
    if (onDownload) {
      onDownload(file);
    }
  };

  if (files.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground border border-border rounded-lg">
        <File className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>No files attached</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file, index) => {
        const Icon = getFileIcon(file.type);
        return (
          <motion.div
            key={file.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
          >
            {/* File Icon/Preview */}
            {file.preview ? (
              <img
                src={file.preview}
                alt={file.name}
                className="w-14 h-14 object-cover rounded"
              />
            ) : (
              <div className="w-14 h-14 bg-muted/30 rounded flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
              </div>
            )}

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span>{formatFileSize(file.size)}</span>
                {file.uploadedAt && (
                  <>
                    <span>•</span>
                    <span>{formatDate(file.uploadedAt)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(file)}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              
              {!readOnly && onDelete && (
                <button
                  onClick={() => onDelete(file.id || index)}
                  className="p-2 rounded text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  aria-label="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FileManager;
