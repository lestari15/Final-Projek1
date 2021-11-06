module.exports = {
    commonError: {
      status: false,
      message: 'Terjadi Kesalahan Pada Server',
      code: 501
    },
    commonErrormessage: (data) => {
      return {
        status: false,
        message: data,
        code: 403
      }
    },
    commonTokenError: (data) => {
      return {
        status: false,
        message: data,
        code: 401
      }
    },
    commonSuccess: {
      status: true,
      message: 'Berhasil Memuat Permintaan',
      code: 200
    },
    commonSuccessOnly: {
      status: true,
      code: 200
    },
    commonSuccessWithData: (data) => {
      return {
        status: true,
        message: "Berhasil memuat permintaan",
        code: 200,
        result: data
      }
    },
     commonSuccessLogin: (data, token) => {
      return {
        status: true,
        message: "Berhasil memuat permintaan",
        code: 200,
        result: data,
        token: token
      }
    },
  };