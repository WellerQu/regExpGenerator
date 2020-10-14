
import { generate, Result, Sample } from './regExpGenerator'

describe('regExpGenerator', () => {
  /* eslint-disable no-useless-escape */
  const sampleList = [
    /* 0 */'Sep 25 01:22:59 10.5.172.40 Feb 24 19:44:58 BD-Panorama 1,2020/09/25 01:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/25 01:22:59,,globalprotectgateway-agent-msg,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway agent message. Login from: 192.168.55.100, User name: tng\jordy, Time: Fri Sep 25 01:22:59 2016., Message: Agent Disable, Comment: none. Override(s)=1.",641825,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 1 */'Sep 25 02:22:59 10.5.172.40 Feb 24 22:46:02 BD-Panorama 1,2020/09/25 02:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/25 02:22:59,,globalprotectportal-auth-succ,GP-Portal-1,0,0,general,informational,"GlobalProtect portal user authentication succeeded. Login from: 65.55.223.21, User name: tng\troy, Auth type: profile.",642013,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 2 */'Sep 24 20:22:59 10.5.172.40 Feb 24 21:45:09 BD-Panorama 1,2020/09/24 20:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 20:22:59,,globalprotectgateway-config-succ,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway client configuration generated. User name: tng\riker, Private IP: 192.168.55.104, Client version: 2.3.4-4, Device name: BD-CLIENT, Client OS version: Microsoft W",641955,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 3 */'Sep 24 18:22:59 10.5.172.40 Feb 24 19:32:23 BD-Panorama 1,2020/09/24 18:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 18:22:59,,globalprotectgateway-config-succ,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway client configuration generated. User name: tng\jordy, Private IP: 192.168.55.100, Client version: 2.3.4-4, Device name: BD-CLIENT, Client OS version: Microsoft W",641813,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 4 */'Sep 24 17:22:59 10.5.172.40 Feb 24 19:32:23 BD-Panorama 1,2020/09/24 17:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 17:22:59,,globalprotectgateway-auth-succ,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway user authentication succeeded. Login from: 205.178.144.19, User name: tng\jordy, Auth type: profile, Client OS version: Microsoft Windows Server 2008 R2 Enterprise",641811,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 5 */'Sep 24 16:22:59 10.5.172.40 Feb 24 22:46:02 BD-Panorama 1,2020/09/24 16:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 16:22:59,,globalprotectportal-auth-succ,GP-Portal-1,0,0,general,informational,"GlobalProtect portal user authentication succeeded. Login from: 64.147.162.160, User name: tng\crusher, Auth type: profile.",642013,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 6 */'Sep 24 15:22:59 10.5.172.40 Feb 24 22:06:07 BD-Panorama 1,2020/09/24 15:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 15:22:59,,globalprotectgateway-logout-succ,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway user logout succeeded. User name: tng\riker, Client OS version: Microsoft Windows Server 2008 R2 Enterprise Edition Service Pac, Reason: client logout.",641977,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 7 */'Sep 24 13:22:59 10.5.172.40 Feb 24 21:45:09 BD-Panorama 1,2020/09/24 13:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 13:22:59,,globalprotectportal-auth-fail,GP-Portal-1,0,0,general,informational,"GlobalProtect portal user authentication failed. Login from: 60.28.233.48, User name: Administrator, Reason: Authentication failed: Invalid username or password , Auth type: profi",641947,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 8 */'Sep 24 08:22:59 10.5.172.40 Feb 24 19:44:58 BD-Panorama 1,2020/09/24 08:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 08:22:59,,globalprotectgateway-agent-msg,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway agent message. Login from: 192.168.55.100, User name: tng\jordy, Time: Thu Sep 24 08:22:59 2016., Message: Agent Disable, Comment: none. Override(s)=1.",641825,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 9 */'Sep 24 08:22:59 10.5.172.40 Feb 24 22:46:02 BD-Panorama 1,2020/09/24 08:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 08:22:59,,globalprotectportal-config-succ,GP-Portal-1,0,0,general,informational,"GlobalProtect portal client configuration generated. Login from: 64.147.162.160, User name: tng\crusher, Config name: VPN-GW-1.",642014,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 10 */'Sep 24 04:22:59 10.5.172.40 Feb 24 19:32:23 BD-Panorama 1,2020/09/24 04:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 04:22:59,,globalprotectportal-config-succ,GP-Portal-1,0,0,general,informational,"GlobalProtect portal client configuration generated. Login from: 205.178.144.19, User name: tng\jordy, Config name: VPN-GW-1.",641809,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 11 */'Sep 24 03:22:59 10.5.172.40 Feb 24 19:32:23 BD-Panorama 1,2020/09/24 03:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 03:22:59,,globalprotectportal-config-succ,GP-Portal-1,0,0,general,informational,"GlobalProtect portal client configuration generated. Login from: 205.178.144.19, User name: tng\jordy, Config name: VPN-GW-1.",641809,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 12 */'Sep 24 03:22:59 10.5.172.40 Feb 24 22:45:32 BD-Panorama 1,2020/09/24 03:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 03:22:59,,globalprotectportal-auth-fail,GP-Portal-1,0,0,general,informational,"GlobalProtect portal user authentication failed. Login from: 64.135.77.120, User name: Admin, Reason: Authentication failed: Invalid username or password , Auth type: profi",642008,0x8000000000000000,0,0,0,0,,PA-VM',
    /* 13 */'九月 24日 03:22:59 10.5.172.41 二月 24日 22:45:31 这是什么 1,2020/09/25 03:22:59,007200001164,SYSTEM',
    /* 14 */'十二月 29日 03:22:59 10.5.172.41 二月 24日 22:45:31 这是什么 1,2020/09/25 03:22:59,007200001164,SYSTEM',
  ]
  /* eslint-enable no-useless-escape */

  it('未选择任何区间', () => {
    const selectedAreas: Sample[] = []
    const result = generate(sampleList[2], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({ expr: '.*', names: {} } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[2])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(1)
  })

  it('未提供任何样例', () => {
    const selectedAreas = [
      {
        name: 'anything',
        value: 'Sep 24',
        startIndex: 0
      }
    ]
    const result = generate('', selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({ expr: '.*', names: {} } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[2])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(1)
  })

  it('生成表达式: 选取一段', () => {
    const selectedAreas = [
      {
        name: 'LoginFromIP',
        value: '192.168.55.100',
        startIndex: 251
      }
    ]
    const result = generate(sampleList[0], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){16}(\\d+\\.\\d+\\.\\d+\\.\\d+)',
      names: {
        'LoginFromIP': {
          groupIndex: 1,
          standaloneExpr: "^(?:[^ \\n]* ){16}(\\d+\\.\\d+\\.\\d+\\.\\d+)"
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[0])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['LoginFromIP'].groupIndex]).toEqual('192.168.55.100')

    const standaloneMatches = sampleList[0].match(result.names['LoginFromIP'].standaloneExpr)
    expect(standaloneMatches).not.toBeNull()
    expect(standaloneMatches).toHaveLength(2)
    expect(standaloneMatches[1]).toBe('192.168.55.100')
  })

  it('生成表达式: 选取三段', () => {
    const selectedAreas = [
      {
        name: 'Time 1',
        value: ' 02:22:59',
        startIndex: 6
      },
      {
        name: 'Part of IP',
        value: '5.172.40',
        startIndex: 19
      },
      {
        name: 'Date 1',
        value: 'Sep 25',
        startIndex: 0
      }
    ]
    const result = generate(sampleList[1], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(\\w+ \\d+)( \\d+:\\d+:\\d+)(?:[^\\.\\n]*\\.){1}(\\d+\\.\\d+\\.\\d+)',
      names: {
        'Time 1': {
          groupIndex: 2,
          standaloneExpr: "^(?:[^ \\n]* ){1}\\d+?( \\d+:\\d+:\\d+)"
        },
        'Part of IP': {
          groupIndex: 3,
          standaloneExpr: "^(?:[^ \\n]* ){3}\\d+\\.(\\d+\\.\\d+\\.\\d+)"
        },
        'Date 1': {
          groupIndex: 1,
          standaloneExpr: "^(\\w+ \\d+)"
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[1])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['Date 1'].groupIndex]).toEqual('Sep 25')
    expect(matches[result.names['Time 1'].groupIndex]).toEqual(' 02:22:59')
    expect(matches[result.names['Part of IP'].groupIndex]).toEqual('5.172.40')

    selectedAreas.forEach(area => {
      const standaloneMatches = sampleList[1].match(result.names[area.name].standaloneExpr)
      expect(standaloneMatches).not.toBeNull()
      expect(standaloneMatches).toHaveLength(2)
      expect(standaloneMatches[1]).toBe(area.value)
    })
  })

  it('准确识别位置: 命中第二个时间格式的字符串, 但不命中第一个', () => {
    const selectedAreas = [
      {
        name: 'Time 2',
        value: '19:32:23',
        startIndex: 35
      }
    ]
    const result = generate(sampleList[4], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){6}(\\d+:\\d+:\\d+)',
      names: {
        'Time 2': {
          groupIndex: 1,
          standaloneExpr: "^(?:[^ \\n]* ){6}(\\d+:\\d+:\\d+)"
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[4])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['Time 2'].groupIndex]).not.toBe('17:22:59')
    expect(matches[result.names['Time 2'].groupIndex]).toBe("19:32:23")
  })

  it('选择部分IP地址', () => {
    const selectedAreas = [
      {
        name: 'part of IP',
        value: '72.40',
        startIndex: 22
      }
    ]
    const result = generate(sampleList[5], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){3}\\d+\\.\\d+\\.\\d+?(\\d+\\.\\d+)',
      names: {
        'part of IP': {
          groupIndex: 1,
          standaloneExpr: "^(?:[^ \\n]* ){3}\\d+\\.\\d+\\.\\d+?(\\d+\\.\\d+)"
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[5])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['part of IP'].groupIndex]).toBe("72.40")
  })

  it('选择部分单词会匹配不准确', () => {
    const selectedAreas = [
      {
        name: 'part of string',
        value: 'nora',
        startIndex: 49
      }
    ]
    const result = generate(sampleList[6], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){7}\\w+-\\w+?(\\w+)',
      names: {
        'part of string': {
          groupIndex: 1,
          standaloneExpr: '^(?:[^ \\n]* ){7}\\w+-\\w+?(\\w+)'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[5])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['part of string'].groupIndex]).not.toBe('nora')
  })

  it('选择字符串包含标点符号', () => {
    const selectedAreas = [
      {
        name: 'include -',
        value: 'auth-fail',
        startIndex: 155
      }
    ]
    const result = generate(sampleList[7], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-(\\w+-\\w+)',
      names: {
        "include -": {
          groupIndex: 1,
          standaloneExpr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-(\\w+-\\w+)'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[7])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['include -'].groupIndex]).toBe('auth-fail')
  })

  it('选择字符串以标点符号开头', () => {
    const selectedAreas = [
      {
        name: '- www',
        value: 'Panorama',
        startIndex: 47
      }
    ]
    const result = generate(sampleList[8], selectedAreas)

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: "^(?:[^ \\n]* ){7}\\w+-(\\w+)",
      names: {
        "- www": {
          groupIndex: 1,
          standaloneExpr: '^(?:[^ \\n]* ){7}\\w+-(\\w+)'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[8])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['- www'].groupIndex]).toBe('Panorama')
  })

  it('中文支持', () => {
    const selectedAreas = [
      {
        name: '日期 1',
        value: '九月 24日',
        startIndex: 0
      },
      {
        name: '日期 2',
        value: '二月 24日',
        startIndex: 28
      }
    ]
    const result = generate(sampleList[13], selectedAreas)
    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: "^([\\u4e00-\\u9fa5]+ \\d+[\\u4e00-\\u9fa5])(?:[^\\.\\n]*\\.){3}\\d+ ([\\u4e00-\\u9fa5]+ \\d+[\\u4e00-\\u9fa5])",
      names: {
        '日期 1': {
          groupIndex: 1,
          standaloneExpr: '^([\\u4e00-\\u9fa5]+ \\d+[\\u4e00-\\u9fa5])'
        },
        '日期 2': {
          groupIndex: 2,
          standaloneExpr: '^(?:[^ \\n]* ){4}([\\u4e00-\\u9fa5]+ \\d+[\\u4e00-\\u9fa5])'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[13])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['日期 1'].groupIndex]).toBe('九月 24日')
    expect(matches[result.names['日期 2'].groupIndex]).toBe('二月 24日')

    const reg2 = new RegExp(result.expr, 'im')
    const matches2 = reg2.exec(sampleList[14])

    expect(matches2).not.toBeNull()
    expect(matches2).toHaveLength(selectedAreas.length + 1)
    expect(matches2[result.names['日期 1'].groupIndex]).toBe('十二月 29日')
    expect(matches2[result.names['日期 2'].groupIndex]).toBe('二月 24日')

    selectedAreas.forEach(area => {
      const standaloneMatches = sampleList[13].match(result.names[area.name].standaloneExpr)
      expect(standaloneMatches).not.toBeNull()
      expect(standaloneMatches).toHaveLength(2)
      expect(standaloneMatches[1]).toBe(area.value)
    })
  })

  it("根据其中一个日志生成正则表达式, 并验证其它日志", () => {
    const selectedAreas = [
      {
        name: 'IP',
        value: '60.28.233.48',
        startIndex: 265
      },
      {
        name: 'time',
        value: '19:44:58',
        startIndex: 35
      },
      {
        name: 'date',
        value: '2020/09/27',
        startIndex: 58
      },
      {
        name: 'time2',
        value: 'Sep 24',
        startIndex: 0
      },
      {
        name: 'state',
        value: 'failed',
        startIndex: 245
      }
    ]
    const result = generate(sampleList[7], selectedAreas)

    const cases = sampleList.map(sample => {
      const reg = new RegExp(result.expr, 'im')
      const matches = reg.exec(sample)

      return matches
    }).map(item => item ? [...item] : null)

    expect(cases).toEqual([
      null,
      [
        "Sep 25 02:22:59 10.5.172.40 Feb 24 22:46:02 BD-Panorama 1,2020/09/25 02:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/25 02:22:59,,globalprotectportal-auth-succ,GP-Portal-1,0,0,general,informational,\"GlobalProtect portal user authentication succeeded. Login from: 65.55.223.21",
        "Sep 25",
        "22:46:02",
        "2020/09/25",
        "succeeded",
        "65.55.223.21"
      ],
      null,
      null,
      [
        "Sep 24 17:22:59 10.5.172.40 Feb 24 19:32:23 BD-Panorama 1,2020/09/24 17:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 17:22:59,,globalprotectgateway-auth-succ,VPN-GW-N,0,0,general,informational,\"GlobalProtect gateway user authentication succeeded. Login from: 205.178.144.19",
        "Sep 24",
        "19:32:23",
        "2020/09/24",
        "succeeded",
        "205.178.144.19",
      ],
      [
        "Sep 24 16:22:59 10.5.172.40 Feb 24 22:46:02 BD-Panorama 1,2020/09/24 16:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 16:22:59,,globalprotectportal-auth-succ,GP-Portal-1,0,0,general,informational,\"GlobalProtect portal user authentication succeeded. Login from: 64.147.162.160",
        "Sep 24",
        "22:46:02",
        "2020/09/24",
        "succeeded",
        "64.147.162.160",
      ],
      null,
      [
        "Sep 24 13:22:59 10.5.172.40 Feb 24 21:45:09 BD-Panorama 1,2020/09/24 13:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 13:22:59,,globalprotectportal-auth-fail,GP-Portal-1,0,0,general,informational,\"GlobalProtect portal user authentication failed. Login from: 60.28.233.48",
        "Sep 24",
        "21:45:09",
        "2020/09/24",
        "failed",
        "60.28.233.48",
      ],
      null,
      [
        "Sep 24 08:22:59 10.5.172.40 Feb 24 22:46:02 BD-Panorama 1,2020/09/24 08:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 08:22:59,,globalprotectportal-config-succ,GP-Portal-1,0,0,general,informational,\"GlobalProtect portal client configuration generated. Login from: 64.147.162.160",
        "Sep 24",
        "22:46:02",
        "2020/09/24",
        "generated",
        "64.147.162.160",
      ],
      [
        "Sep 24 04:22:59 10.5.172.40 Feb 24 19:32:23 BD-Panorama 1,2020/09/24 04:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 04:22:59,,globalprotectportal-config-succ,GP-Portal-1,0,0,general,informational,\"GlobalProtect portal client configuration generated. Login from: 205.178.144.19",
        "Sep 24",
        "19:32:23",
        "2020/09/24",
        "generated",
        "205.178.144.19",
      ],
      [
        "Sep 24 03:22:59 10.5.172.40 Feb 24 19:32:23 BD-Panorama 1,2020/09/24 03:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 03:22:59,,globalprotectportal-config-succ,GP-Portal-1,0,0,general,informational,\"GlobalProtect portal client configuration generated. Login from: 205.178.144.19",
        "Sep 24",
        "19:32:23",
        "2020/09/24",
        "generated",
        "205.178.144.19",
      ],
      [
        "Sep 24 03:22:59 10.5.172.40 Feb 24 22:45:32 BD-Panorama 1,2020/09/24 03:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/24 03:22:59,,globalprotectportal-auth-fail,GP-Portal-1,0,0,general,informational,\"GlobalProtect portal user authentication failed. Login from: 64.135.77.120",
        "Sep 24",
        "22:45:32",
        "2020/09/24",
        "failed",
        "64.135.77.120",
      ],
      null,
      null
    ])
  })

  it('使用自定义分隔符', () => {
    const selectedAreas = [
      {
        name: 'date',
        value: '09/24',
        startIndex: 63
      }
    ]
    const separator = '/'
    const result = generate(sampleList[9], selectedAreas, { separator })

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: "^(?:[^/\\n]*/){1}(\\d+/\\d+)",
      names: {
        date: {
          groupIndex: 1,
          standaloneExpr: '^(?:[^/\\n]*/){1}(\\d+/\\d+)'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[9])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['date'].groupIndex]).toBe('09/24')
  })

  it('不同精确度的匹配: 模糊匹配', () => {
    const selectedAreas = [
      {
        name: 'status',
        value: 'succ',
        startIndex: 162
      }
    ]
    const result = generate(sampleList[10], selectedAreas, { level: 'fuzzy' })

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-\\w+-(\\w+)',
      names: {
        status: {
          groupIndex: 1,
          standaloneExpr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-\\w+-(\\w+)'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[10])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['status'].groupIndex]).toBe('succ')
  })

  it('不同精确度的匹配: 一般匹配', () => {
    const selectedAreas = [
      {
        name: 'status',
        value: 'succ',
        startIndex: 162
      }
    ]
    const result = generate(sampleList[10], selectedAreas, { level: 'normal' })

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-\\w+-(\\w\\w\\w\\w)',
      names: {
        status: {
          groupIndex: 1,
          standaloneExpr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-\\w+-(\\w\\w\\w\\w)'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[10])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['status'].groupIndex]).toBe('succ')
  })

  it('不同精确度的匹配: 精确匹配', () => {
    const selectedAreas = [
      {
        name: 'status',
        value: 'succ',
        startIndex: 162
      }
    ]
    const result = generate(sampleList[10], selectedAreas, { level: 'exact' })

    expect(result).not.toBeNull()
    expect(result).toEqual({
      expr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-\\w+-(succ)',
      names: {
        status: {
          groupIndex: 1,
          standaloneExpr: '^(?:[^ \\n]* ){10}\\d+:\\d+:\\d+,,\\w+-\\w+-(succ)'
        }
      }
    } as Result)

    const reg = new RegExp(result.expr, 'im')
    const matches = reg.exec(sampleList[10])

    expect(matches).not.toBeNull()
    expect(matches).toHaveLength(selectedAreas.length + 1)
    expect(matches[result.names['status'].groupIndex]).toBe('succ')
  })

  it.skip('性能测试: 选择五个字段生成表达式, 验证30万行数据', () => {
    const size = 100000 * 3
    const len = sampleList.length
    const newSamples = new Array(size)

    for (let i = 0; i < size; i++) {
      newSamples[i] = sampleList[i % len]
    }

    const selectedAreas = [
      {
        name: 'IP',
        value: '60.28.233.48',
        startIndex: 265
      },
      {
        name: 'time',
        value: '19:44:58',
        startIndex: 35
      },
      {
        name: 'date',
        value: '2020/09/27',
        startIndex: 58
      },
      {
        name: 'time2',
        value: 'Sep 24',
        startIndex: 0
      },
      {
        name: 'state',
        value: 'failed',
        startIndex: 245
      }
    ]

    function readMatches(matches: RegExpMatchArray | null) {
      return matches
    }

    const result = generate(sampleList[7], selectedAreas)
    const start = +new Date()

    for (let i = 0; i < newSamples.length; i++) {
      const reg = new RegExp(result.expr, 'im')
      const matches = reg.exec(newSamples[i])

      readMatches(matches)
    }

    const end = +new Date()

    expect(end - start).toBeLessThan(1000)

    // console.log(newSamples.length, `${end - start}ms`, result.expr)
  })
})