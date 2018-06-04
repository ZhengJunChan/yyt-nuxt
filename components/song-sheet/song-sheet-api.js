import ApiUtil from '@/utils/api-util.js';

export default {
    getSongSheetDetail(params) {
        return ApiUtil.get(`/v2/api/song/${params.id}`);
    }
};
