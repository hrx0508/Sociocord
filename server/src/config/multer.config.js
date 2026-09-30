import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({storage})

//connect to imagekit server via multer