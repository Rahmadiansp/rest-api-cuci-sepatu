const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di API Cuci Sepatu',
    endpoints: {
      'GET /items': 'Menampilkan semua data sepatu',
      'GET /items?status=Selesai': 'Filter berdasarkan status',
      'POST /items': 'Menambah data sepatu baru',
      'PUT /items/:id': 'Update status sepatu',
      'DELETE /items/:id': 'Hapus data sepatu'
    }
  });
});

app.get('/items', async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = supabase
      .from('items')
      .select('*')
      .order('id', { ascending: true });
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data',
      error: error.message
    });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data sepatu tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data',
      error: error.message
    });
  }
});

app.post('/items', async (req, res) => {
  try {
    const { nama, status, tanggal_masuk, tanggal_selesai } = req.body;
    
    if (!nama || !tanggal_masuk) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan tanggal masuk wajib diisi'
      });
    }
    
    const newItem = {
      nama,
      status: status || 'Sedang Dicuci',
      tanggal_masuk,
      tanggal_selesai: tanggal_selesai || null
    };
    
    const { data, error } = await supabase
      .from('items')
      .insert([newItem])
      .select();
    
    if (error) throw error;
    
    res.status(201).json({
      success: true,
      message: 'Data sepatu berhasil ditambahkan',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan data',
      error: error.message
    });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, status, tanggal_masuk, tanggal_selesai } = req.body;
    
    const { data: existingData } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: 'Data sepatu tidak ditemukan'
      });
    }
    
    const updateData = {};
    if (nama) updateData.nama = nama;
    if (status) updateData.status = status;
    if (tanggal_masuk) updateData.tanggal_masuk = tanggal_masuk;
    if (tanggal_selesai !== undefined) updateData.tanggal_selesai = tanggal_selesai;
    
    const { data, error } = await supabase
      .from('items')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    res.json({
      success: true,
      message: 'Status sepatu berhasil diperbarui',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data',
      error: error.message
    });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: existingData } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: 'Data sepatu tidak ditemukan'
      });
    }
    
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.json({
      success: true,
      message: 'Data sepatu berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus data',
      error: error.message
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;