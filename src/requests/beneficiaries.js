module.exports = ({config, request}) => {
  const {resourceServerUrl} = config
  const BENEFICIARIES_READ_SCOPE = "beneficiaries:read"
  const BENEFICIARIES_DETAIL_READ_SCOPE = "beneficiaries_detail:read"
  const getOneBeneficiary = ({id, userId, scope}) =>
    request(`${resourceServerUrl}/beneficiaries/${id}`, {
      cc: {
        sub: userId,
        scope,
      },
    })

  const getAllBeneficiaries = ({params, userId, scope}) =>
    request(`${resourceServerUrl}/beneficiaries`, {
      searchParams: params,
      cc: {
        sub: userId,
        scope,
      },
    })
  return {
    getBeneficiary: ({id, userId}) =>
      getOneBeneficiary({id, userId, scope: BENEFICIARIES_READ_SCOPE}),
    getBeneficiaryWithDetail: ({id, userId}) =>
      getOneBeneficiary({id, userId, scope: BENEFICIARIES_DETAIL_READ_SCOPE}),
    getBeneficiaries: ({userId, params = {}}) =>
      getAllBeneficiaries({params, userId, scope: BENEFICIARIES_READ_SCOPE}),
    getBeneficiariesWithDetail: ({userId, params = {}}) =>
      getAllBeneficiaries({params, userId, scope: BENEFICIARIES_DETAIL_READ_SCOPE})
  }
}
