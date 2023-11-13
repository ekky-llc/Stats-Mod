import fs from 'fs';

export interface FileImport {
    datapoint: string;
    data: string;
}

function CompileRaidData(raid_guid: string) {
    console.log(`[STATS] Starting - Compiling raid data for '${raid_guid}' into '.json' format.`);

    const file_suffixes = ['raid', 'players', 'kills', 'aggressions', 'looting'];
    const files = [] as FileImport[];

    for (let i = 0; i < file_suffixes.length; i++) {
        const file_suffix = file_suffixes[i];
        const file_data = fs.readFileSync(`${__dirname}/../../../data/${raid_guid}/${raid_guid}_${file_suffix}.csv`, 'utf-8');
        files.push({
            datapoint: file_suffix,
            data: file_data
        });
    }

    let raid_data = {} as any;
    for (let i = 0; i < files.length; i++) {
        
        const file = files[i];
        const [ keys_str, ...data_str ] = file.data.split('\n');
        const keys = keys_str.replace('\n', '').split(',');
        const rows = data_str.filter((row) => row !== '').map(row => row.split(','));

        if (file.datapoint === 'raid') {
            for (let j = 0; j < rows.length; j++) {
                const row = rows[j];

                for (let k = 0; k < keys.length; k++) {
                    const key = keys[k];
                    raid_data[key] = row[k];
                }

            }
        }

        if (file.datapoint === 'players') {
            let players = [];

            for (let j = 0; j < rows.length; j++) {
                const row = rows[j];

                let newPlayer = {};
                for (let k = 0; k < keys.length; k++) {
                    const key = keys[k];
                    newPlayer[key] = row[k];
                }

                players.push(newPlayer);
            }

            raid_data.players = players;
        }

        if (file.datapoint === 'kills') {
            let kills = [];

            for (let j = 0; j < rows.length; j++) {
                const row = rows[j];

                let newKill = {};
                for (let k = 0; k < keys.length; k++) {
                    const key = keys[k];
                    newKill[key] = row[k];
                }

                kills.push(newKill);
            }

            raid_data.kills = kills;
        }

        if (file.datapoint === 'aggressions') {
            let aggressions = [];

            for (let j = 0; j < rows.length; j++) {
                const row = rows[j];

                let newAggression = {};
                for (let k = 0; k < keys.length; k++) {
                    const key = keys[k];
                    newAggression[key] = row[k];
                }

                aggressions.push(newAggression);
            }

            raid_data.aggressions = aggressions;
        }

        if (file.datapoint === 'looting') {
            let looting = [];

            for (let j = 0; j < rows.length; j++) {
                const row = rows[j];

                let newLooting = {};
                for (let k = 0; k < keys.length; k++) {
                    const key = keys[k];
                    newLooting[key] = row[k];
                }


                looting.push(newLooting);
            }

            raid_data.looting = looting;
        }
    }
    console.log(`[STATS] Finished - Compiling raid data for '${raid_guid}' into '.json' format.`);

    fs.writeFileSync(`${__dirname}/../../../data/${raid_guid}/${raid_guid}_data.json`, JSON.stringify(raid_data, null, 2),'utf-8');

    console.log(`[STATS] Saved file  '${raid_guid}_data.json' to folder '<mod>/data/${raid_guid}'.`);
};

export default CompileRaidData;