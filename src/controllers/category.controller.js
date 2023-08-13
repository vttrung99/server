import categories from "../models/category.model"


export default {
    findMany:async  function (req, res) {

        try {
            let modelRes = await categories.findMany();
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        }catch(err) {
            return res.status(500).json({
                message: "Lỗi server!"
            })
        }
    }
}