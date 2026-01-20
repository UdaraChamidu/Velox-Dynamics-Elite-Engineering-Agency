import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Image as ImageIcon, FileText, Archive, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onFilesChange, maxFiles = 5, maxSize = 5242880, acceptedTypes, existingFiles = [] }) => {
  const [files, setFiles] = useState(existingFiles);
  const [errors, setErrors] = useState([]);

  const getFileIcon = (file) => {
    const type = file.type;
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

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setErrors([]);
    const newErrors = [];

    // Check for rejected files
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach(error => {
        if (error.code === 'file-too-large') {
          newErrors.push(`${file.name} is too large (max ${formatFileSize(maxSize)})`);
        } else if (error.code === 'file-invalid-type') {
          newErrors.push(`${file.name} has an invalid file type`);
        } else {
          newErrors.push(`${file.name}: ${error.message}`);
        }
      });
    });

    // Check total file count
    if (files.length + acceptedFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      setErrors(newErrors);
      return;
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add accepted files
    const fileObjects = acceptedFiles.map(file => ({
      file,
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    const updatedFiles = [...files, ...fileObjects];
    setFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  }, [files, maxFiles, maxSize, onFilesChange]);

  const removeFile = (fileId) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedTypes || {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar']
    },
    disabled: files.length >= maxFiles
  });

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : files.length >= maxFiles
            ? 'border-border bg-muted/20 cursor-not-allowed opacity-50'
            : 'border-border hover:border-primary hover:bg-muted/10'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className={`w-12 h-12 mx-auto mb-4 ${
          isDragActive ? 'text-primary' : 'text-muted-foreground'
        }`} />
        {isDragActive ? (
          <p className="text-primary font-medium">Drop files here...</p>
        ) : files.length >= maxFiles ? (
          <p className="text-muted-foreground">Maximum files reached ({maxFiles})</p>
        ) : (
          <>
            <p className="text-foreground font-medium mb-2">
              Drag & drop files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Max {maxFiles} files, up to {formatFileSize(maxSize)} each
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, DOC, DOCX, Images, ZIP
            </p>
          </>
        )}
      </div>

      {/* Error Messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {errors.map((error, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Files List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <h4 className="text-sm font-medium text-muted-foreground">
              Uploaded Files ({files.length}/{maxFiles})
            </h4>
            {files.map((fileObj) => {
              const Icon = getFileIcon(fileObj);
              return (
                <motion.div
                  key={fileObj.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                >
                  {/* Preview or Icon */}
                  {fileObj.preview ? (
                    <img
                      src={fileObj.preview}
                      alt={fileObj.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted/30 rounded flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  )}

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{fileObj.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(fileObj.size)}
                    </p>
                  </div>

                  {/* Success Icon */}
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(fileObj.id)}
                    className="p-1 rounded hover:bg-muted/30 text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
