from django.http import HttpResponse

from substrateinterface import SubstrateInterface, Keypair
from substrateinterface.exceptions import SubstrateRequestException



def index(request):
    substrate = SubstrateInterface(
        url="ws://127.0.0.1:9944",
        ss58_format=42,
        type_registry_preset='kusama'
    )

    # keypair = Keypair.create_from_mnemonic('episode together nose spoon dose oil faculty zoo ankle evoke admit walnut')

    keypair = Keypair.create_from_uri('//Alice')

    account_info = substrate.query('System', 'Account', params=[keypair.ss58_address])

    print('Account info', account_info.value)

    call = substrate.compose_call(
        call_module='Balances',
        call_function='transfer',
        call_params={
            'dest': '5E9oDs9PjpsBbxXxRE9uMaZZhnBAV38n2ouLB28oecBDdeQo',
            'value': 1 * 10**12
        }
    )

    extrinsic = substrate.create_signed_extrinsic(call=call, keypair=keypair)

    try:
        receipt = substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)
        print("Extrinsic '{}' sent and included in block '{}'".format(receipt.extrinsic_hash, receipt.block_hash))
        return HttpResponse("Extrinsic '{}' sent and included in block '{}'".format(receipt.extrinsic_hash, receipt.block_hash))

    except SubstrateRequestException as e:
        print("Failed to send: {}".format(e))
        return HttpResponse("Hello, world. You're at the polls index. {}".format(e))

