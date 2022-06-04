export const getProductsQuery = ({
  user,
  params = {
    search: '',
    skip: 0,
    limit: 5,
  },
  filter = {},
  sort = {},
}: any) => [
    {
      $lookup: {
        from: 'favorites',
        as: 'is_favorite',
        let: { product_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  // prettier-ignore
                  { $eq: ['$$product_id', '$product'] },
                  { $eq: ['$user_id', user.id] },
                ],
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        is_favorite: {
          $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true],
        },
      },
    },
    {
      $match: {
        ...filter,
        $or: [{ title: { $regex: params.search || '', $options: 'i' } }],
      },
    },
    {
      $facet: {
        total: [
          {
            $count: 'createdAt',
          },
        ],
        data: [
          {
            $addFields: {
              _id: '$_id',
            },
          },
        ],
      },
    },
    {
      $sort: {
        ...sort,
        createdAt: -1,
      },
    },
    {
      $unwind: '$total',
    },
    {
      $project: {
        data: {
          $slice: [
            '$data',
            params.skip ? Number(params.skip) : 0,
            {
              $ifNull: [params.limit ? Number(params.limit) : 10, '$total.createdAt'],
            },
          ],
        },
        meta: {
          total: '$total.createdAt',
          limit: {
            $literal: params.limit ? Number(params.limit) : 10,
          },
          page: {
            $literal: (params.skip ? Number(params.skip) : 0 / params.limit ? Number(params.limit) : 10) + 1,
          },
          pages: {
            $ceil: {
              $divide: ['$total.createdAt', params.limit ? Number(params.limit) : 10],
            },
          },
        },
      },
    },
  ];
