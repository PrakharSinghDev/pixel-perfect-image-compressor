'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Upload, FileImage, Download, RefreshCw, Sliders, CheckCircle, AlertCircle, X, Zap } from 'lucide-react';

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(80);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [estimatedSize, setEstimatedSize] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);

  // Helper to format bytes to MB/KB
  const formatSize = (bytes) => {
    if (bytes === 0 || bytes === null || isNaN(bytes)) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setError('Please select a valid image file (JPG, PNG).');
        return;
      }
      setError('');
      setOriginalFile(file);
      setCompressedFile(null);
      setCompressedUrl(null);
      setEstimatedSize(null);
      
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const clearAll = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setCompressedUrl(null);
    setPreviewUrl(null);
    setError('');
    setIsCompressing(false);
    setEstimatedSize(null);
  };

  // Shared Compression Logic
  const getCompressedBlob = async (url, q) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Compression failed"));
          },
          'image/jpeg',
          q / 100
        );
      };
      img.onerror = (err) => reject(err);
    });
  };

  // Effect to calculate estimate when quality changes
  useEffect(() => {
    if (!originalFile || !previewUrl) return;

    const calculateEstimate = async () => {
      setIsEstimating(true);
      try {
        const blob = await getCompressedBlob(previewUrl, quality);
        setEstimatedSize(blob.size);
      } catch (err) {
        console.error("Estimation failed", err);
      } finally {
        setIsEstimating(false);
      }
    };

    // Debounce the calculation to avoid lagging while dragging
    const timeoutId = setTimeout(calculateEstimate, 300);

    return () => clearTimeout(timeoutId);
  }, [quality, previewUrl, originalFile]);

  // Main Compress Handler
  const handleCompress = async () => {
    if (!originalFile) return;
    
    setIsCompressing(true);
    setError('');

    try {
      const blob = await getCompressedBlob(previewUrl, quality);
      setCompressedFile(blob);
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
    } catch (err) {
      console.error(err);
      setError('An error occurred during compression.');
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedUrl || !originalFile) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `compressed_${quality}_${originalFile.name.split('.')[0]}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-red-500 selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-orange-600 mb-2 uppercase tracking-tight">
            PixelPerfect <span className="text-white">Compressor</span>
          </h1>
          <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-red-500" />
            High-performance client-side optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Controls Section (Left/Top) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Upload Area */}
            {!originalFile && (
              <div className="bg-zinc-900 rounded-2xl shadow-2xl border-2 border-dashed border-zinc-700 hover:border-red-600 hover:bg-zinc-900/80 transition-all duration-300 p-10 flex flex-col items-center justify-center min-h-[300px] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="bg-zinc-800 p-4 rounded-full mb-4 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 shadow-lg shadow-black/50">
                  <Upload className="w-8 h-8 text-red-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">Upload Image</h3>
                <p className="text-gray-500 text-sm mb-6">JPG, PNG supported</p>
                <label className="relative cursor-pointer z-10">
                  <span className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-red-900/20 hover:bg-red-700 hover:shadow-red-600/20 transition-all">
                    Select File
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                  />
                </label>
                {error && (
                  <div className="mt-4 flex items-center text-red-400 bg-red-900/20 border border-red-900/50 px-4 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* 2. Image Preview & Settings */}
            {originalFile && (
              <div className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-800">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                  <div className="flex items-center space-x-3">
                    <FileImage className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-200 truncate max-w-[200px]">
                      {originalFile.name}
                    </span>
                  </div>
                  <button 
                    onClick={clearAll}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    title="Remove Image"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 grid md:grid-cols-2 gap-8">
                  {/* Preview Image */}
                  <div className="flex flex-col items-center justify-center bg-black/40 rounded-xl p-2 min-h-[200px] border border-zinc-800">
                     <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-64 object-contain rounded-lg shadow-md" 
                    />
                    <div className="mt-2 text-xs font-medium text-gray-400 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                      Original: {formatSize(originalFile.size)}
                    </div>
                  </div>

                  {/* Settings Controls */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="flex items-center text-sm font-bold text-gray-300">
                          <Sliders className="w-4 h-4 mr-2 text-red-500" />
                          Compression Level
                        </label>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono transition-colors ${isEstimating ? 'text-zinc-600' : 'text-zinc-400'}`}>
                             {isEstimating ? 'Calculating...' : `~${formatSize(estimatedSize)}`}
                          </span>
                          <span className="bg-red-900/30 text-red-400 border border-red-900/50 text-xs font-bold px-2 py-1 rounded">
                            {quality}%
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">
                        <span>Smallest Size</span>
                        <span>Best Quality</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleCompress}
                        disabled={isCompressing}
                        className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all duration-200 shadow-lg ${
                          isCompressing 
                            ? 'bg-zinc-800 text-zinc-500 cursor-wait' 
                            : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-900/40 hover:-translate-y-0.5'
                        }`}
                      >
                        {isCompressing ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Crunching Pixels...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5 fill-current" />
                            <span>Compress Image</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section (Right/Bottom) */}
          <div className="lg:col-span-1">
             <div className={`h-full bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 p-6 flex flex-col transition-all duration-500 relative overflow-hidden ${!compressedFile ? 'opacity-75' : 'opacity-100'}`}>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

                <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center relative z-10">
                  <CheckCircle className={`w-5 h-5 mr-2 ${compressedFile ? 'text-green-500' : 'text-zinc-600'}`} />
                  Output
                </h2>

                {compressedFile ? (
                  <div className="flex-1 flex flex-col items-center justify-between space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
                    <div className="w-full bg-green-900/10 rounded-xl p-6 border border-green-900/30 text-center">
                      <p className="text-green-500 text-sm font-medium mb-1">New Size</p>
                      <p className="text-3xl font-black text-green-400 mb-2 tracking-tight">
                        {formatSize(compressedFile.size)}
                      </p>
                      <div className="inline-flex items-center text-xs font-bold text-green-400 bg-green-900/30 px-3 py-1 rounded border border-green-800/50">
                        Reduced by {((originalFile.size - compressedFile.size) / originalFile.size * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="w-full">
                       <p className="text-xs text-center text-gray-500 mb-2 uppercase tracking-wide font-bold">Result Preview</p>
                       <img 
                          src={compressedUrl} 
                          alt="Compressed result" 
                          className="w-full h-32 object-contain bg-black/40 rounded-lg border border-zinc-800"
                        />
                    </div>

                    <button
                      onClick={downloadImage}
                      className="w-full py-4 bg-gray-100 hover:bg-white text-black rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center space-x-2 border border-transparent hover:border-gray-300"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <Download className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-center text-sm font-medium">
                      Waiting for input...
                    </p>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}